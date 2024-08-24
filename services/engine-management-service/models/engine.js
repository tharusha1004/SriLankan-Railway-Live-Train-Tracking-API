const mongoose = require('mongoose');

const EngineSchema = new mongoose.Schema({
    engine_id: {
        type: String,
        required: true,
        unique: true,
    },
    train_id: {
        type: String,
        required: true,
    },
    assigned_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Engine', EngineSchema);
