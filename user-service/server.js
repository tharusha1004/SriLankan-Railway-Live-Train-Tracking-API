require('dotenv').config(); 

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const mongoose = require('./src/config/db');
const bodyParser = require('body-parser');
const cors = require('cors');

const swaggerDocument = require('./src/swagger/swagger.json');
const logger = require('./src/utils/logger');
const userRoutes = require('./src/routes/userRoutes');

const server = express();


server.use(cors()); 
server.use(bodyParser.json());

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use('/api', userRoutes);

const PORT = process.env.PORT || 3006;
server.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

module.exports = server;
