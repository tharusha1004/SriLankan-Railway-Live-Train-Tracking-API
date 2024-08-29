const mongoose = require('mongoose');

const engineSchema = new mongoose.Schema({
    engineId: { type: String, required: true },
    status: { type: String, enum: ['Operational', 'Crashing', 'Under Maintenance'], required: true },
    currentStation: { type: String, required: true },
    delayTime: { type: Number, default: 0 } // Delay in minutes
});

const Engine = mongoose.model('Engine', engineSchema);

module.exports = Engine;