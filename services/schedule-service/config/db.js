const mongoose = require('mongoose');
const logger = require('../logs/schedule.log');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false); // or true based on your needs
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.info('MongoDB connected');
    } catch (error) {
        logger.error(`MongoDB connection error: ${error.message}`);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;

