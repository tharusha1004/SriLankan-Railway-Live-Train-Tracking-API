// routes/engine.js
const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const router = express.Router();

router.use('/engines', createProxyMiddleware({
    target: process.env.ENGINE_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/engines': '/', // remove /engines from the URL
    },
}));

module.exports = router;
