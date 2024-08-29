// routes/engine.js
const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const router = express.Router();

router.use('/notifications', createProxyMiddleware({
    target: process.env.NOTIFICATION_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/notifications': '/', // remove /notifications from the URL
    },
}));

module.exports = router;
