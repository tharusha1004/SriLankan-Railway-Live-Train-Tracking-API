const scheduleService = require('../services/scheduleService');
const { publishMessage } = require('../services/rabbitmqService');

const getAllSchedules = (req, res) => {
    scheduleService.getAllSchedules((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

const getScheduleById = (req, res) => {
    const scheduleId = req.params.id;
    scheduleService.getScheduleById(scheduleId, (err, results) => {
        if (err) return res.status(500).json(err);
        if (!results) return res.status(404).json({ message: "Schedule not found" });
        res.json(results);
    });
};

const createSchedule = (req, res) => {
    const schedule = req.body;
    scheduleService.createSchedule(schedule, (err, results) => {
        if (err) return res.status(500).json(err);
        publishMessage('scheduleQueue', JSON.stringify(schedule));
        res.status(201).json(results);
    });
};

module.exports = { getAllSchedules, getScheduleById, createSchedule };
