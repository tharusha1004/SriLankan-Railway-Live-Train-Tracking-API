const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');
const authMiddleware = require('../config/auth');

// Admin routes
router.post('/trains', authMiddleware, trainController.createTrain);
router.put('/trains/:id', authMiddleware, trainController.updateTrain);

// Normal user routes
router.get('/trains', trainController.getTrains);

module.exports = router;
