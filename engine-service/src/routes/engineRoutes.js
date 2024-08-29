const express = require('express');
const router = express.Router();
const engineController = require('../controllers/engineController');
const authMiddleware = require('../config/auth');

// Admin routes
router.post('/engine-status', authMiddleware, engineController.createOrUpdateEngine);

// Normal user routes
router.get('/engine-status', engineController.getEngine);

module.exports = router;