const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    trainId: { type: String, required: true },
    startStation: { type: String, required: true },
    startTime: { type: Date, required: true },
    endStation: { type: String, required: true },
    endTime: { type: Date, required: true },
    stations: { type: [String], required: true },
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;