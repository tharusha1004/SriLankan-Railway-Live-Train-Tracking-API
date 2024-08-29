const express = require('express');
const router = express.Router();
const trainTrackingController = require('../controllers/trainTrackingController');
const authMiddleware = require('../config/auth');

// Admin routes
router.post('/train-location', authMiddleware, trainTrackingController.addLocation);
router.put('/train-location/:id', authMiddleware, trainTrackingController.updateLocation);

// Normal user routes
router.get('/train-location', trainTrackingController.getLocations);

module.exports = router;