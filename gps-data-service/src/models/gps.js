const mongoose = require('mongoose');

const gpsData = new mongoose.Schema({
    trianId: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    timestamp:{
        type: Date,
        default: Date.now
    },
});

gpsData.index({"timestamp":1},{expireAfterSeconds: 777600});    // 90 Days -> 90 x 24 x 60 x 60 = 777600 seconds

module.exports = mongoose.model('GPSData', gpsData);