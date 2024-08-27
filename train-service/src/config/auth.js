const basicAuth = require('express-basic-auth');

const authMiddleware = basicAuth({
    users: { 'admin': '123456' },
    challenge: true,
    unauthorizedResponse: 'Unauthorized'
});

module.exports = authMiddleware;
