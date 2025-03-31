require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
    sign: (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN }),
    verify: (token) => jwt.verify(token, process.env.JWT_SECRET)
};