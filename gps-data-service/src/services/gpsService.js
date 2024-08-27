const GPSData = require('../models/gps');

exports.addGPSData = async (data) => {
    const gpsData = new GPSData(data);
    return await gpsData.Save();
};

exports.getGPSData = async() => {
    return await GPSData.find();
}