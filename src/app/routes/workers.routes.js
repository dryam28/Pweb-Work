import { Router } from 'express';
const router = Router()
import { getHome, createWorker, generateExcel, deleteWorkers, getUsers, getWorkers, getWorker, editWorker, getRequests } from '../controllers/workers.controller.js';

router.get('/', getHome);
router.get('/users', getUsers);
router.get('/workers', getWorkers);
router.get('/workers/:id', getWorker);
router.get('/requests', getRequests);
router.post('/add', createWorker);
router.post('/editworker/:id', editWorker);
router.post('/delete', deleteWorkers);
router.post('/download-excel', generateExcel);

export default router;
