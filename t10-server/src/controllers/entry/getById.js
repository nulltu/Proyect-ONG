const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const { getOneById } = require('../../services/entryService/entry.service');
const newEntryData = require('../../utils/entry/newEntryData');
const { OK } = require('../../utils/statusCode');
const { ENTRY_NOT_FOUND } = require('../../utils/error.messages');

const getEntryById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw boom.badRequest(errors.array()[0].msg);
  }

  const { id } = req.params;
  const entry = await getOneById(id);
  if (entry === null) {
    throw boom.notFound(ENTRY_NOT_FOUND);
  } else {
    res.status(OK).json(newEntryData(entry));
  }
};

module.exports = getEntryById;
