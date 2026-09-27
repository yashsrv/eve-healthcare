import { listCentres } from '../controllers/centres.controller.js';

import { Router } from 'express';

const router = Router();

router.get('/', listCentres);

export default router;