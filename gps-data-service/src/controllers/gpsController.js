const GPSData = require('../models/gps');

const addGPSData = async (req, res) => {
    try {
        const gpsData = new GPSData(req, res);
        await gpsData.save();
        res.status(201).send(gpsData);
    }
    catch (error) {
        res.status(400).send(error);
    }
};

const getGPSData = async (req, res) => {
    try {
        const data = await GPSData.find();
        res.status(200).send(data);
    }
    catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { addGPSData, getGPSData };
