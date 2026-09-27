import { paymentGateway, paymentWebhook} from '../controllers/payments.controller.js';
import { verifyJwtMiddleware } from '../middlewares/auth.middleware.js';

import { Router } from 'express';

const router = Router();

router.post('/', verifyJwtMiddleware, paymentGateway);
router.post('/webhook', paymentWebhook);

export default router;