require('dotenv').config(); 

const express = require('express');
const logger = require('./src/utils/logger');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/swagger/swagger.json');
const trainRoutes = require('./src/routes/trainRoutes');
const mongoose = require('./src/config/db');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', trainRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

module.exports = app;
