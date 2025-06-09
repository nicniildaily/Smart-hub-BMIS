const express = require('express');
const router = express.Router();
const { createUser, getProfile } = require('../controllers/usersController');
const requireAuth = require('../middleware/requireAuth');

router.post('/', createUser);
router.get('/profile', requireAuth, getProfile);

module.exports = router;
