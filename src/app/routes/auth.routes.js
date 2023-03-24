const router = require('express').Router();
const { loginForm } = require('../../controllers/auth.controller');


router.get('/login', loginForm)

module.exports = router