const { check } = require('express-validator');
const message = require('../utils/error.messages');

const body = [
  check('name').notEmpty().withMessage(message.NAME_EMPTY),
  check('email')
    .notEmpty()
    .withMessage(message.EMAIL_EMPTY)
    .isEmail()
    .withMessage(message.EMAIL_INVALID),
  check('question').notEmpty().withMessage(message.QUESTION_EMPTY),
];

module.exports = body;
