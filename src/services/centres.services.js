import db from '../config/db.config.js';

export const listCentresHandler = async () => {
	// We can add a limit if there are many centres. but keeping it simple for assessment.
	const result = await db.query(`
		SELECT
			id AS "testId",
			centre_name AS "centreName",
			test_name AS "testName",
			amount,
			location
		FROM public.centres`
	);

	return result.rows;
}