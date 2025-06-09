const express = require('express');
const router = express.Router();
const { getBusinessDetails, getClients } = require('../controllers/adminController');
const requireAuth = require('../middleware/requireAuth');

router.get('/business-details', requireAuth, getBusinessDetails);
router.get('/clients', requireAuth, getClients);

module.exports = router;
