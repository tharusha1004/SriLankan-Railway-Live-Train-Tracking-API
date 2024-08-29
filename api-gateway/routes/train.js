// routes/auth.js
const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const router = express.Router();

router.use('/trains', (req, res, next) => {
    console.log(`Proxying request to: ${process.env.TRAIN_SERVICE_URL}`);
    next();
}, createProxyMiddleware({
    target: process.env.TRAIN_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/trains': '/', // remove /trains from the URL
    },
}));

module.exports = router;
