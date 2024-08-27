const express = require('express');
const router = express.Router();
const gpsController = require('../controllers/gpsController');

router.post('/gps-data', gpsController.addGPSData);
router.get('/gps-data', gpsController.getGPSData);

module.exports = router;