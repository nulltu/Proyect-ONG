/* eslint-disable consistent-return */
const passport = require('passport');
const boom = require('@hapi/boom');

const autenticate = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (!user) next(boom.unauthorized(info));

    req.user = user;

    next();
  })(req, res, next);
};

module.exports = autenticate;
