const { param } = require('express-validator');
const message = require('../utils/error.messages');

const paramId = param('id').isInt().withMessage(message.INVALID_PARAM_ID);

module.exports = paramId;
