const { check } = require('express-validator');
const message = require('../utils/error.messages');

const body = [
  check('onCourseId').notEmpty().withMessage(message.CONTENT_EMPTY),
];

module.exports = body;
