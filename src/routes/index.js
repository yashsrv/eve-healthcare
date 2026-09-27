import authRoutes from './auth.routes.js';
import paymentsRoutes from './payments.routes.js';
import bookingsRoutes from './bookings.routes.js';
import centresRoutes from './centres.routes.js';

import { Router } from 'express';

const router = Router();

router.use('/auth', authRoutes);
router.use('/payments', paymentsRoutes);
router.use('/bookings', bookingsRoutes);
router.use('/centres', centresRoutes);

export default router;