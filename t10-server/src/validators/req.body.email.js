const { check } = require('express-validator');
const message = require('../utils/error.messages');
const { Users } = require('../models');

const body = [
  check('email')
    .notEmpty()
    .withMessage(message.EMAIL_EMPTY)
    .isEmail()
    .withMessage(message.EMAIL_INVALID)
    .custom(async (email) => {
      const exists = await Users.findOne({ where: { email } });
      if (!exists) {
        throw message.USER_DONT_EXIST;
      }
    }),
];

module.exports = body;
