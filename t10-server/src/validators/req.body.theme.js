const { check } = require('express-validator');
const message = require('../utils/error.messages');

const body = [
  check('name').notEmpty().withMessage(message.THEME_NAME_EMPTY),
  check('primaryColor').notEmpty().withMessage(message.COLOR_EMPTY),
  check('lettersColor').notEmpty().withMessage(message.COLOR_EMPTY),
  check('backgroundColor').notEmpty().withMessage(message.COLOR_EMPTY),
];

module.exports = body;
