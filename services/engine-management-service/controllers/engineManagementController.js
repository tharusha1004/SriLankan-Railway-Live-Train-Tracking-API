const engineService = require('../services/engineService');
const { publishMessage } = require('../services/rabbitmqService');

// Assign an engine to a train
const assignEngineToTrain = (req, res) => {
    const engineAssignment = req.body;
    engineService.assignEngine(engineAssignment, (err, results) => {
        if (err) return res.status(500).json(err);
        publishMessage('engineQueue', JSON.stringify(engineAssignment));
        res.status(201).json(results);
    });
};

// Get assigned engines for a specific train
const getEnginesByTrainId = (req, res) => {
    const trainId = req.params.trainId;
    engineService.getEnginesByTrainId(trainId, (err, results) => {
        if (err) return res.status(500).json(err);
        if (!results || results.length === 0) return res.status(404).json({ message: "Engines not found" });
        res.json(results);
    });
};

module.exports = { assignEngineToTrain, getEnginesByTrainId };
