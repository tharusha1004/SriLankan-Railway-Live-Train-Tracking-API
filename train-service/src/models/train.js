const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
    trainName: { type: String, required: true },
    trainId: { type: String, required: true, unique: true },
    lane: { type: String, required: true },
});

const Train = mongoose.model('Train', trainSchema);

module.exports = Train;
