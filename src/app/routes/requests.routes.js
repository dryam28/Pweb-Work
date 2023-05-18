import { Router } from 'express';
import { getRequests } from '../controllers/requests.controller.js';
const router = Router()

router.get('/', getRequests);

export default router;
