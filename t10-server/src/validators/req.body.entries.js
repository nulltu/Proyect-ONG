const boom = require('@hapi/boom');

const { check } = require('express-validator');
const {
  TITLE_EMPTY,
  CONTENT_EMPTY,
  TYPE_EMPTY,
  TYPE_ID,
} = require('../utils/error.messages');
const { EntriesTypes } = require('../models');
const message = require('../utils/error.messages');

const body = [
  check('title').notEmpty().withMessage(TITLE_EMPTY),
  check('content').notEmpty().withMessage(CONTENT_EMPTY),
  check('typeId')
    .notEmpty()
    .withMessage(TYPE_EMPTY)
    .isInt()
    .withMessage(TYPE_ID)
    .custom(async (id) => {
      const exists = await EntriesTypes.findOne({ where: { id } });
      if (!exists) {
        throw boom.badRequest(message.ENTRY_TYPE_ID);
      }
      return true;
    }),
];

module.exports = body;
