const { check } = require('express-validator');
const message = require('../utils/error.messages');

const body = [
  check('name').notEmpty().withMessage(message.NAME_EMPTY),
  check('description').notEmpty().withMessage(message.DESCRIPTION_EMPTY),
  check('phone').notEmpty().withMessage(message.PHONE_EMPTY),
  check('address').notEmpty().withMessage(message.ADDRESS_EMPTY),
  check('welcomeText').notEmpty().withMessage(message.WELCOMETEXT_EMPTY),
];

module.exports = body;
