import { Router } from 'express';
const router = Router()
import { body } from "express-validator";
import { getProfile, loginForm, loginUser, logOut,saveProfileChanges } from '../controllers/auth.controller.js';
import { userVerification } from '../middlewares/userVerification.js';

router.get('/login', loginForm);
router.post('/login', [
    body('email', "Ingrese un email").trim().isEmail().normalizeEmail(),
], loginUser);
router.get("/logout", logOut);
// Profile
router.get('/profile', userVerification, getProfile)
router.post('/save-profile-changes', userVerification, saveProfileChanges)

export default router;
