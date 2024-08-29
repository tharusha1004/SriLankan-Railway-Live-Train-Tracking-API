require('dotenv').config(); 

const express = require('express');
const logger = require('./src/utils/logger');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerDocument = require('./src/swagger/swagger.json');
const scheduleRoutes = require('./src/routes/scheduleRoutes');
const mongoose = require('./src/config/db');

const server = express();
server.use(express.json());
server.use(cors()); 
server.use(bodyParser.json());

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use('/api', scheduleRoutes);

const PORT = process.env.PORT || 3003;
server.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

module.exports = server;
