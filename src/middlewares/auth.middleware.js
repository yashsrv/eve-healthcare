import { verifyJwt } from '../utils/jwt.util.js';

// Actual implementation of OAuth token verification will be done here.
export const verifyOAuthMiddleware = (req, res, next) => {
	req.user = {
		id: 1,
		email: 'yashteaches@gmail.com',
		username: 'Yash Srivastava'
	}
	return next();
}

export const verifyJwtMiddleware = (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];
		req.user = verifyJwt(token);
		return next();
	}
	catch (err) {
		console.error(err);
		return res.status(401).json({
			message: err instanceof Error ? err.message : 'Internal server error'
		})
	}
}