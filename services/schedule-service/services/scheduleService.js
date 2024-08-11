const Schedule = require('../models/schedule');

const getAllSchedules = (callback) => {
    Schedule.find({}, callback);
};

const getScheduleById = (id, callback) => {
    Schedule.findById(id, callback);
};

const createSchedule = (scheduleData, callback) => {
    const schedule = new Schedule(scheduleData);
    schedule.save(callback);
};

module.exports = { getAllSchedules, getScheduleById, createSchedule };
