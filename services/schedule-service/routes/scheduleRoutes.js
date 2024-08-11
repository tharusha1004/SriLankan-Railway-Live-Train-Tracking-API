const express = require('express');
const router = express.Router();
const scheduleService = require('../services/scheduleService');
const { publishMessage } = require('../services/rabbitmqService');

// Get all schedules
router.get('/schedules', (req, res) => {
    scheduleService.getAllSchedules((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Get a specific schedule by ID
router.get('/schedules/:id', (req, res) => {
    const scheduleId = req.params.id;
    scheduleService.getScheduleById(scheduleId, (err, results) => {
        if (err) return res.status(500).json(err);
        if (!results) return res.status(404).json({ message: "Schedule not found" });
        res.json(results);
    });
});

// Create a new schedule
router.post('/schedules', (req, res) => {
    const schedule = req.body;
    scheduleService.createSchedule(schedule, (err, results) => {
        if (err) return res.status(500).json(err);
        publishMessage('scheduleQueue', JSON.stringify(schedule));
        res.status(201).json(results);
    });
});

module.exports = router;
