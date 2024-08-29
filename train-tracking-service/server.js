require('dotenv').config(); 

const express = require('express');
const logger = require('./src/utils/logger');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerDocument = require('./src/swagger/swagger.json');
const trainTrackingRoutes = require('./src/routes/trainTrackingRoutes');
const mongoose = require('./src/config/db');

const server = express();
server.use(express.json());

server.use(cors()); 
server.use(bodyParser.json());

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use('/api', trainTrackingRoutes);

const PORT = process.env.PORT || 3005;
server.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

module.exports = server;