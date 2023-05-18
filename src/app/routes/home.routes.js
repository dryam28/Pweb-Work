import { Router } from 'express';
const router = Router()
import { getHome } from '../controllers/home.controller.js';

router.get('/', getHome);

export default router;
