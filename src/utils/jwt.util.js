import jwt from 'jsonwebtoken';

const { JWT_EXPIRATION, JWT_SECRET } = process.env;

export const generateJwt = (user) => {
	const payload = {
		sub: user.id,
		email: user.email,
		username: user.username
	}

	return jwt.sign(payload, JWT_SECRET, { 
		expiresIn: JWT_EXPIRATION,
		issuer: 'eve-healthcare'
	});
}

export const verifyJwt = (token) => {
	return jwt.verify(token, JWT_SECRET);
}