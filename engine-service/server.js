require('dotenv').config(); 

const express = require('express');
const logger = require('./src/utils/logger');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/swagger/swagger.json');
const engineRoutes = require('./src/routes/engineRoutes');
const mongoose = require('./src/config/db');

const server = express();
server.use(express.json());

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use('/api', engineRoutes);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

module.exports = server;