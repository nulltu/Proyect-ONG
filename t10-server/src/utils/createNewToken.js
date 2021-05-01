const jwt = require('jsonwebtoken');

const createNewToken = (user) =>
  jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
    algorithm: process.env.JWT_ALGORITHM,
  });

module.exports = createNewToken;
