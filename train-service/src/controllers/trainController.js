const Train = require('../models/train');
const logger = require('../utils/logger');

// Admin - Create Train
exports.createTrain = async (req, res) => {
    try {
        const { trainName, trainId, lane } = req.body;
        const train = new Train({ trainName, trainId, lane });
        await train.save();
        logger.info(`Train ${trainName} created successfully`);
        res.status(201).send(train);
    } catch (error) {
        logger.error('Error creating train: ' + error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
};

// Admin - Update Train
exports.updateTrain = async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body;
        const train = await Train.findByIdAndUpdate(id, update, { new: true });
        if (!train) {
            return res.status(404).send({ message: 'Train not found' });
        }
        logger.info(`Train ${train.trainName} updated successfully`);
        res.send(train);
    } catch (error) {
        logger.error('Error updating train: ' + error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
};

// Normal User - View Trains
exports.getTrains = async (req, res) => {
    try {
        const trains = await Train.find();
        res.send(trains);
    } catch (error) {
        logger.error('Error fetching trains: ' + error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
};
