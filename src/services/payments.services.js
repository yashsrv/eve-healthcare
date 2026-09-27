import db from '../config/db.config.js';
import crypto from 'crypto';
import AppError from '../utils/apperror.js';

const { PORT } = process.env;

export const paymentGatewayHandler = async (user, bookingId, status) => {
	const bookingDetails = await db.query(`
		SELECT
			amount,
			status AS "bookingStatus",
			patient_email AS "patientEmail"
		FROM public.bookings
		WHERE id = $1`,
		[bookingId]
	);

	if (bookingDetails.rowCount === 0) {
		throw new AppError(400, "Invalid 'bookingId'");
	}

	const { amount, bookingStatus, patientEmail } = bookingDetails.rows[0];
	if (bookingStatus === 'CONFIRMED' || bookingStatus === 'CANCELLED') {
		throw new AppError(400, `Booking is already ${bookingStatus.toLowerCase()}`);
	}
	if (patientEmail !== user.email) {
		throw new AppError(401, "You are not authorized to make payments for this booking.")
	}

	const message = status === 'SUCCESS'
			? `Payment successful of INR ${amount}`
			: `Payment failed of INR ${amount}`

	const id = crypto.randomUUID();

	return {
		message,
		webhook : {
			url: `http://localhost:${PORT}/payment/webhook`,
			payload: { id, amount, status, bookingId }
		}
	};
}

export const paymentWebhookHandler = async (payload) => {
	let client;  // Transaction client.

	try {
		client = await db.connect();
		await client.query('BEGIN');

		const { id, amount, status, bookingId } = payload;
		const result1 = await client.query(`
			INSERT INTO public.payments (id, amount, status, booking_id)
			VALUES ($1, $2, $3, $4)
			ON CONFLICT (id) DO NOTHING
			RETURNING *`,
			[id, amount, status, bookingId]
		);

		if (result1.rowCount !== 1) {
			throw new AppError(409, "Webhook already processed");
		}

		// This only updates PENDING/FAILED bookings, other states are unaffected
		const bookingStatus = status === 'SUCCESS' ? 'CONFIRMED' : 'FAILED'
		const result = await client.query(`
			UPDATE public.bookings
			SET status = $1,
					updated_at = NOW()
			WHERE (status = 'PENDING' OR status = 'FAILED') AND id = $2`,
			[bookingStatus, bookingId]
		);

		if (result.rowCount !== 1) {
			throw new AppError(409, "Webhook already processed");
		}

		await client.query('COMMIT');
		return { message: "Webhook processed successfully" }
	}	catch (err) {
		await client.query('ROLLBACK');
		throw err;
	} finally {
		client.release();
	}
}