import { generateJwt } from '../utils/jwt.util.js';
import { createUser, getUser } from '../services/auth.services.js';

export const signup = async (req, res) => {
	try {
		const user = await createUser(req.user);
		const jwt = generateJwt(user);

		const isNewUser = user.inserted;
		delete user.inserted;

		const statusCode = isNewUser ? 201 : 200;
		const message = isNewUser ? 'Signup successful' : 'Login successful';

		res.setHeader('Authorization', `Bearer ${jwt}`);
		return res.status(statusCode).json({ message, user })
	} catch (err) {
		console.error(err);
		return res.status(err.statusCode || 500).json({
			message: err.message || 'Internal server error'
		})
	}
}

export const login = async (req, res) => {
	try {
		const user = await getUser(req.user);
		const jwt = generateJwt(user);

		res.setHeader('Authorization', `Bearer ${jwt}`);
		return res.status(200).json({ message: 'Login successful', user });
	} catch (err) {
		console.error(err);
		return res.status(err.statusCode || 500).json({
			message: err.message || 'Internal server error'
		})
	}
}