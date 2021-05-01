const jwt = require('jsonwebtoken');

const createRefreshToken = (tokenKey) =>
  jwt.sign({ tokenKey }, process.env.JWT_SECRET, {
    expiresIn: process.env.REFRESH_JWT_LIFETIME,
    algorithm: process.env.JWT_ALGORITHM,
  });

module.exports = createRefreshToken;
