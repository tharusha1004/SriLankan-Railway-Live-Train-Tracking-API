const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    train_id: {
        type: String,
        required: true,
    },
    route: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
