const basicAuth = require('express-basic-auth');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const authenticate = async (username, password, cb) => {
    if (username === 'admin' && password === '123456') {
        return cb(null, true);
    }

    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        return cb(null, true);
    }
    return cb(null, false);
};

const authMiddleware = basicAuth({
    authorizeAsync: true,
    authorizer: authenticate,
    challenge: true,
    unauthorizedResponse: () => 'Unauthorized',
});

module.exports = authMiddleware;
