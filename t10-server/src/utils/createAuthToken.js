const jwt = require('jsonwebtoken');

const createAuthToken = (user) =>
  jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.AUTH_JWT_LIFETIME,
    algorithm: process.env.JWT_ALGORITHM,
  });

module.exports = createAuthToken;
