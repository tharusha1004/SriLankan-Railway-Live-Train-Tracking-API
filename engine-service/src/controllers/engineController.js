const Engine = require('../models/engine');
const logger = require('../utils/logger');


// Admin - Create and Update Engine Status
exports.createOrUpdateEngine = async (req, res) => {
    try {
        const { engineId, status, currentStation, delayTime } = req.body;
        const engine = await Engine.findOneAndUpdate(
            { engineId },
            { status, currentStation, delayTime },
            { new: true, upsert: true }
        );
        logger.info(`Engine ${engineId} status updated successfully`);
        res.status(201).send(engine);
    } catch (error) {
        logger.error('Error create or update engine status: ' + error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
};


// Normal User - View Engine Status
exports.getEngine = async (req, res) => {
    try {
        const {engineId} = req.query;
        const engine = await Engine.find({engineId});
        if(!engine){
            return res.status(404).send({message: 'Engine not found'});
        }
        res.send(engine);
    } catch (error) {
        logger.error('Error fetching engine data: ' + error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
};