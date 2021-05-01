const { check } = require('express-validator');
const message = require('../utils/error.messages');
const { Users } = require('../models');

const body = [
  check('firstName').notEmpty().withMessage(message.FIRSTNAME_EMPTY),
  check('lastName').notEmpty().withMessage(message.LASTNAME_EMPTY),
  check('email')
    .notEmpty()
    .withMessage(message.EMAIL_EMPTY)
    .isEmail()
    .withMessage(message.EMAIL_INVALID)
    .custom(async (email) => {
      const exists = await Users.findOne({ where: { email } });
      if (exists) {
        throw message.USER_ALREADY_EXIST;
      }
      return true;
    }),
  check('password').notEmpty().withMessage(message.PASSWORD_EMPTY),
];

module.exports = body;
