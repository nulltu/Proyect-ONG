const { check } = require('express-validator');
const message = require('../utils/error.messages');
const { Users, Roles } = require('../models');

const body = [
  check('firstName').notEmpty().withMessage(message.FIRSTNAME_EMPTY),
  check('lastName').notEmpty().withMessage(message.LASTNAME_EMPTY),
  check('email')
    .notEmpty()
    .withMessage(message.EMAIL_EMPTY)
    .isEmail()
    .withMessage(message.EMAIL_INVALID)
    .custom(async (email, { req }) => {
      const exists = await Users.findOne({ where: { email } });
      if (exists && exists.id !== +req.params.id) {
        throw message.USER_ALREADY_EXIST;
      }
      return true;
    }),
  check('roleId').custom(async (id) => {
    const role = await Roles.findOne({ where: { id } });
    if (!role) {
      throw message.USER_ALREADY_EXIST;
    }
    return true;
  }),
];

module.exports = body;
