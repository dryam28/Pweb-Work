import { Router } from 'express';
const router = Router()
import { loginForm } from '../controllers/auth.controller.js';

router.get('/login', loginForm);

export default router;
