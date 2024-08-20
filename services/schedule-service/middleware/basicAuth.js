const basicAuth = require('express-basic-auth');

const users = {
    'admin': 'admin1234',
    'user': 'user1234'
};

const authMiddleware = basicAuth({
    users,
    challenge: true
});

module.exports = authMiddleware;
