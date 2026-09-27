import { listCentresHandler } from '../services/centres.services.js';

export const listCentres = async (req, res) => {
	try {
		const centres = await listCentresHandler();
		return res.status(200).json({ centres });
	}	catch (err) {
		console.error(err);
		return res.status(err.statusCode || 500).json({
			message: err.message || 'Internal server error'
		})
	}
}