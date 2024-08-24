const Engine = require('../models/engine');

// Get all engine assignments
const getAllEngines = (callback) => {
    Engine.find({}, callback);
};

// Get engine assignments by train ID
const getEnginesByTrainId = (trainId, callback) => {
    Engine.find({ train_id: trainId }, (err, engines) => {
        if (err) return callback(err, null);
        callback(null, engines);
    });
};

// Assign a new engine to a train
const assignEngine = (engineData, callback) => {
    const engine = new Engine(engineData);
    engine.save(callback);
};

module.exports = { getAllEngines, getEnginesByTrainId, assignEngine };
