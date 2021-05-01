/* eslint-disable consistent-return */
const passport = require('passport');
const boom = require('@hapi/boom');

const autenticate = (req, res, next) => {
  passport.authenticate(
    'refreshToken',
    { session: false },
    (err, token, info) => {
      if (!token) {
        next(boom.unauthorized(info));
      }

      req.token = token;

      next();
    },
  )(req, res, next);
};

module.exports = autenticate;
