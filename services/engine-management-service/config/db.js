const mongoose = require('mongoose');
const logger = require('../logs/engine.log'); 

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false); 
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.info('MongoDB connected');
    } catch (error) {
        logger.error(`MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
