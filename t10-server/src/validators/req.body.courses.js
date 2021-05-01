const { check } = require('express-validator');
const message = require('../utils/error.messages');

const body = [
  check('name').notEmpty().withMessage(message.COURSE_NAME_EMPTY),
  check('description').notEmpty().withMessage(message.COURSE_DESCRIPTION_EMPTY),
  check('duration')
    .notEmpty()
    .withMessage(message.DURATION_EMPTY)
    .isInt()
    .withMessage(message.INVALID_DURATION),
];

module.exports = body;
