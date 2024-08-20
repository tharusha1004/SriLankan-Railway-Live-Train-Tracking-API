const Schedule = require('../models/schedule');

const getAllSchedules = (callback) => {
    Schedule.find({}, callback);
};

const getScheduleByTrainId = (trainId, callback) => {
    Schedule.find({ train_id: trainId }, (err, schedules) => {
        if (err) return callback(err, null);
        callback(null, schedules);
    });
};

const createSchedule = (scheduleData, callback) => {
    const schedule = new Schedule(scheduleData);
    schedule.save(callback);
};

module.exports = { getAllSchedules, getScheduleByTrainId, createSchedule };
