import { Router } from 'express';
const router = Router()
import { createWorker, generateExcel, deleteWorkers, getWorkers, getWorker, editWorker } from '../controllers/workers.controller.js';

router.get('/', getWorkers);
router.get('/:id', getWorker);
router.post('/add', createWorker);
router.post('/edit/:id', editWorker);
router.post('/delete', deleteWorkers);
router.post('/download-excel', generateExcel);

export default router;
