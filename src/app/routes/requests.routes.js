import { Router } from 'express';
import { getRequests, deleteRequests, createRequest, denyRequests, acceptRequests, getRequest } from '../controllers/requests.controller.js';
import { isAdminVerification } from '../middlewares/userVerification.js';
const router = Router()

router.get('/', getRequests);
router.get('/:id', getRequest);
router.post('/delete', deleteRequests);
router.post('/register', createRequest);
router.post('/accept', isAdminVerification, acceptRequests);
router.post('/deny', isAdminVerification, denyRequests);

export default router;
