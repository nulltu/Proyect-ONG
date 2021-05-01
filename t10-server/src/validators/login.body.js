const { check } = require('express-validator');
const message = require('../utils/error.messages');

const body = [
  check('email')
    .notEmpty()
    .withMessage(message.EMAIL_EMPTY)
    .isEmail()
    .withMessage(message.EMAIL_INVALID),
  check('password').notEmpty().withMessage(message.PASSWORD_EMPTY),
];

module.exports = body;
