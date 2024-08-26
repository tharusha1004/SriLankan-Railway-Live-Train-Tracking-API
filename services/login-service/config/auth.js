const jwt = require('jsonwebtoken');
require('dotenv').config();

const authToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).send('Access Denied');
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = verified;
        next();
    }

    catch (error) {
        res.status(400).send('Invalid Token');
    }
};

const generateToken = (user) => {
    return jwt.sign({
        _id: user.id,
        username: user.username
    },
    process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
};

module.exports = { authToken, generateToken };