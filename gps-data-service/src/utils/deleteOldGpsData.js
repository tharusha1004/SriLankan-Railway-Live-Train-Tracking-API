const GPSData = require('../models/gps');


const deleteOldData = async () => {
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    try {
        const result = await GPSData.deleteMany({ timestamp: { $lt: ninetyDaysAgo } });
        console.log(`Deleted ${result.deletedCount} records older than 90 days.`);
    } catch (error) {
        console.error('Error deleting old data:', error);
    }
};

module.exports = deleteOldData;
