const { check } = require('express-validator');
const message = require('../utils/error.messages');

const body = [
  check('firstName').notEmpty().withMessage(message.FIRSTNAME_EMPTY),
  check('lastName').notEmpty().withMessage(message.LASTNAME_EMPTY),
];

module.exports = body;
