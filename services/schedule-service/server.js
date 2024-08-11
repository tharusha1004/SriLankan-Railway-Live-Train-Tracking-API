const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const scheduleRoutes = require('./routes/scheduleRoutes');
const logger = require('./logs/schedule.log');
const authMiddleware = require('./middleware/basicAuth');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

app.use(bodyParser.json());

// Apply Basic Authentication
app.use(authMiddleware);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', scheduleRoutes);

const port = process.env.PORT;

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        logger.info(`Schedule service listening on port ${port}`);
    });
}

module.exports = server;
