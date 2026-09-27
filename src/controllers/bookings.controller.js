import { createBookingHandler } from '../services/bookings.services.js';

export const createBooking = async (req, res) => {
	try {
		const user = req.user;
		const bookingData = req.body;
		
		const booking = await createBookingHandler(user, bookingData);

		return res.status(201).json({ message: 'Booking created successfully', booking });
	} catch (err) {
		console.error(err);
		return res.status(err.statusCode || 500).json({
			message: err.message || 'Internal server error'
		})
	}
}