import { paymentGatewayHandler, paymentWebhookHandler } from '../services/payments.services.js';

export const paymentGateway = async (req, res) => {
	try {
		const user = req.user;
		const { bookingId, status } = req.body;

		const result = await paymentGatewayHandler(user, bookingId, status);
		return res.status(200).json({ ...result });
	} catch (err) {
		console.error(err);
		return res.status(err.statusCode || 500).json({
			message: err.message || 'Internal server error'
		})
	}
}

export const paymentWebhook = async (req, res) => {
	try {
		const payload = req.body;
		const result = await paymentWebhookHandler(payload);

		return res.status(200).json({ ...result });
	} catch (err) {
		console.error(err);
		return res.status(err.statusCode || 500).json({
			message: err.message || 'Internal server error'
		})
	}
}