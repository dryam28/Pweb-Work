const router = require('express').Router();
const { getHome, createWorker } = require('../controllers/home.controller');

router.get('/', getHome);
router.post('/add', createWorker);

module.exports = router;
