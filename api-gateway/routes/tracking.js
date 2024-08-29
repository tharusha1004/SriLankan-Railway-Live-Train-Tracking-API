// routes/engine.js
const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const router = express.Router();

router.use('/locations', createProxyMiddleware({
    target: process.env.TRAIN_TRACKING_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/locations': '/', // remove /locations from the URL
    },
}));

module.exports = router;
