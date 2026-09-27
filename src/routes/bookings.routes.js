import { createBooking } from '../controllers/bookings.controller.js';
import { verifyJwtMiddleware } from '../middlewares/auth.middleware.js';

import { Router } from 'express';

const router = Router();

router.post('/', verifyJwtMiddleware, createBooking);

export default router;