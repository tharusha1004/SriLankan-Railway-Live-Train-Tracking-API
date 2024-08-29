const mongoose = require('mongoose');

const trainTrackingSchema = new mongoose.Schema({
    trainId: { type: String, required: true },
    trainName: { type: String, required: true },
    currentStation: { type: String, required: true },
    status: { type: String, enum: ['On Time', 'Early', 'Late'], required: true }
});

const TrainTracking = mongoose.model('TrainTracking', trainTrackingSchema);

module.exports = TrainTracking;