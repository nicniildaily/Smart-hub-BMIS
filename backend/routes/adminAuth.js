const express = require('express');
const router = express.Router();
const { login, logout, signup } = require('../controllers/adminAuthController');

router.post('/login', login);
router.post('/logout', logout);
router.post('/signup', signup);

module.exports = router;
