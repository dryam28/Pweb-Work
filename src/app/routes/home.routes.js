const router = require('express').Router();
const { getHome, createWorker, deleteWorkers } = require('../controllers/home.controller');

router.get('/', getHome);
router.post('/add', createWorker);
router.post('/delete', deleteWorkers);

module.exports = router;
