import { Router } from 'express';
const router = Router()
import { getUsers, registerUser, deleteUsers, searchUsers } from '../controllers/users.controller.js';
import { body } from 'express-validator';

router.get('/', getUsers);
router.post('/register', registerUser)
router.post('/search', body('searchData', 'El campo de búsqueda no puede estar vacío').trim().notEmpty(), searchUsers)
router.post('/delete', deleteUsers)

export default router;
