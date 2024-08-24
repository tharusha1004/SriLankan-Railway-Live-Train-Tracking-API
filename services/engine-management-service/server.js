require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const engineRoutes = require('./routes/engineRoutes');
const logger = require('./logs/engine.log'); // Update to use engine.log
const authMiddleware = require('./middleware/basicAuth');
const connectDB = require('./config/db');

const server = express();

// Connect to MongoDB
connectDB();

server.use(bodyParser.json());

server.use(authMiddleware);

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use('/api', engineRoutes);

const port = process.env.PORT || 3000; // Default to port 3000 if PORT is not set

if (process.env.NODE_ENV !== 'test') {
    server.listen(port, () => {
        logger.info(`Engine management service listening on port ${port}`);
    });
}

module.exports = server;
