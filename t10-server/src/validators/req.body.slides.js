const { check } = require('express-validator');
const message = require('../utils/error.messages');

const body = [
  check('organizationId')
    .notEmpty()
    .isInt()
    .withMessage(message.ORG_ID_INVALID),
  check('description').notEmpty().withMessage(message.DESCRIPTION_EMPTY),
];

module.exports = body;
