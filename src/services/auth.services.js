import db from '../config/db.config.js';
import AppError from '../utils/apperror.js';

export const createUser = async (user) => {
	const { email, username } = user;

	const result = await db.query(`
		INSERT INTO public.users (email, username)
		VALUES ($1, $2)
		ON CONFLICT (email) DO UPDATE
		SET last_login_at = NOW()
		RETURNING id, email, username, (xmax = 0) AS inserted`,
		[email, username]
	);

	return result.rows[0];
}

export const getUser = async (user) => {
	const { email } = user;
	const result = await db.query(`
		UPDATE public.users
		SET last_login_at = NOW()
		WHERE email = $1
		RETURNING id, email, username`,
		[email]
	);

	if (result.rowCount === 0) {
		throw new AppError(404, 'User not found');
	}

	return result.rows[0];
}