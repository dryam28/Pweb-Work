import { Router } from 'express';
const router = Router()
import { getUsers,registerUser, deleteUsers } from '../controllers/users.controller.js';

router.get('/', getUsers);
router.post('/register', registerUser)
router.post('/delete', deleteUsers)

export default router;
