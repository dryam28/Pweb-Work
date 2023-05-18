import { Router } from 'express';
const router = Router()
import { body } from "express-validator";
import { loginForm, loginUser,logOut } from '../controllers/auth.controller.js';

router.get('/login', loginForm);
router.post('/login',[
    body('email',"Ingrese un email").trim().isEmail().normalizeEmail(),
], loginUser);
router.get("/logout", logOut);

export default router;
