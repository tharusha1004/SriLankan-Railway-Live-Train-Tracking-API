// routes/schedule.js
const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const router = express.Router();

router.use('/schedules', createProxyMiddleware({
    target: process.env.SCHEDULE_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/schedules': '/', // remove /schedules from the URL
    },
}));

module.exports = router;
