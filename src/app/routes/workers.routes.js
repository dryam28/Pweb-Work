import { Router } from 'express';
const router = Router()
import { createWorker, generateExcel, deleteWorkers, getWorkers, getWorker, editWorker, searchWorkers } from '../controllers/workers.controller.js';
import { workerValidator } from '../middlewares/workerVerification.js';
import { body } from 'express-validator';

router.get('/', getWorkers);
router.post('/search', body('searchData', 'El campo de búsqueda no puede estar vacío').trim().notEmpty(), searchWorkers);
router.get('/:id', getWorker);
router.post('/add', workerValidator, createWorker);
router.post('/edit/:id', editWorker);
router.post('/delete', deleteWorkers);
router.post('/download-excel', generateExcel);

export default router;
