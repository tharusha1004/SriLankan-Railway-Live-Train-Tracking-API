const mongoose = require('mongoose');
const logger = require('../utils/logger');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000
}).then(() => {
    logger.info('Connected to MongoDB');
}).catch((error) => {
    logger.error('Error connecting to MongoDB: ', error);
});

module.exports = mongoose;