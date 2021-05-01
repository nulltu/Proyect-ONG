const { check } = require('express-validator');
const message = require('../utils/error.messages');

const body = [
  check('courseId').notEmpty().withMessage(message.ID_NOT_FOUND),

  check('date')
    .notEmpty()
    .withMessage(message.DATE_EMPTY)
    .custom((value) => {
      const date = new Date(value);

      return !Number.isNaN(date.getTime());
    })
    .withMessage('Invalid Date'),
];

module.exports = body;
