const Location = require('../models/trainTracking');
const logger = require('../utils/logger');


// Admin - Create Location
exports.addLocation = async (req, res) =>{
    try{
        const {trainId, trainName, currentStation, status} = req.body;
        const location = new Location({trainId, trainName, currentStation, status});
        await location.save();
        logger.info(`Train ${trainId} location added successfully`);
        res.status(201).send(location);
    } catch(error){
        logger.error('Error adding train location: ' + error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
};

// Admin - Update Location
exports.updateLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body;
        const location = await Location.findByIdAndUpdate(id, update, { new: true });
        if (!location) {
            return res.status(404).send({ message: 'Train not found' });
        }
        logger.info(`Train ${location.trainId} updated successfully`);
        res.send(location);
    } catch (error) {
        logger.error('Error updating location: ' + error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
};

// Normal User - View Location
exports.getLocations = async (req, res) => {
    try {
        const location = await Location.find();
        res.send(location);
    } catch (error) {
        logger.error('Error fetching locations: ' + error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
};