import db from '../config/db.config.js';
import AppError from '../utils/apperror.js';

export const createBookingHandler = async (user, bookingData) => {
	const { username, email } = user;
	const { testId, appointmentTime } = bookingData;

	const centreData = await db.query(`
		SELECT test_name, centre_name, amount
		FROM public.centres
		WHERE id = $1`,
		[testId]
	);

	if (centreData.rowCount === 0) {
		throw new AppError(400, "Invalid 'testId'");
	}

	const { test_name: testName, centre_name: centreName, amount } = centreData.rows[0];
	try {
		const result = await db.query(`
			INSERT INTO public.bookings (patient_name, patient_email, test_name, centre_name, appointment_time, amount)
			VALUES ($1, $2, $3, $4, $5, $6)
			RETURNING
				id AS "bookingId",
				patient_name AS "patientName",
				patient_email AS "patientEmail",
				centre_name AS "centreName",
				appointment_time AS "appointmentTime",
				amount,
				status`,
			[username, email, testName, centreName, appointmentTime, amount]
		);

		return result.rows[0];
	} catch (err) {
		if (err.code === '23503') {
      throw new AppError(400, "Patient does not exist")
    }
	}
}