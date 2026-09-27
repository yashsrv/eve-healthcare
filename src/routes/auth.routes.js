import { signup, login } from '../controllers/auth.controller.js';
import { verifyJwtMiddleware, verifyOAuthMiddleware } from '../middlewares/auth.middleware.js';

import { Router } from 'express';

const router = Router();

router.post('/', verifyOAuthMiddleware, signup);
router.get('/', verifyJwtMiddleware, login);

export default router;