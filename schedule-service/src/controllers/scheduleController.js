const Schedule = require('../models/schedule');
const logger = require('../utils/logger');

// Admin - Create Schedules
exports.createSchedule = async (req,res) =>{
    try{
        const{trainId, startStation, startTime, endStation, endTime, stations} = req.body;
        const schedule = new Schedule({trainId, startStation, startTime, endStation, endTime, stations});
        await schedule.save();
        logger.info(`Schedule for train ${trainId} created successfully`);
        res.status(201).send(schedule);
    } catch(error){
        logger.error('Error creating schedule: ' + error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
};

// Admin - Update Schedule
exports.updateSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body;
        const schedule = await Schedule.findByIdAndUpdate(id, update, { new: true });
        if (!schedule) {
            return res.status(404).send({ message: 'Schedule not found' });
        }
        logger.info(`Schedule for train ${schedule.trainId} updated successfully`);
        res.send(schedule);
    } catch (error) {
        logger.error('Error updating schedule: ' + error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
};

// Admin - Delete Schedule
exports.deleteSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const schedule = await Schedule.findByIdAndDelete(id);
        if (!schedule) {
            return res.status(404).send({ message: 'Schedule not found' });
        }
        logger.info(`Schedule for train ${schedule.trainId} deleted successfully`);
        res.status(204).send();
    } catch (error) {
        logger.error('Error deleting schedule: ' + error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
};

// Normal User - View Schedules
exports.getSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find();
        res.send(schedules);
    } catch (error) {
        logger.error('Error fetching schedules: ' + error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
};
