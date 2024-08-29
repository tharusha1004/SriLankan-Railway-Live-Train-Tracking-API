const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');
const authMiddleware = require('../config/auth');

// Admin routes
router.post('/schedules', authMiddleware, scheduleController.createSchedule);
router.put('/schedules/:id', authMiddleware, scheduleController.updateSchedule);
router.delete('/schedules/:id', authMiddleware, scheduleController.deleteSchedule);

// Normal user routes
router.get('/schedules', scheduleController.getSchedules);

module.exports = router;