const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const engineRoutes = require('./routes/engine');
const notificationRoutes = require('./routes/notification');
const scheduleRoutes = require('./routes/schedule');
const trackingRoutes = require('./routes/tracking');
const trainRoutes = require('./routes/train');


const app = express();
const PORT = process.env.PORT || 3007;

app.use('/api', authRoutes);
app.use('/api', engineRoutes);
app.use('/api', notificationRoutes);
app.use('/api', scheduleRoutes);
app.use('/api', trackingRoutes);
app.use('/api', trainRoutes);

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
