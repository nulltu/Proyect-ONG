const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const {
  deleteOneById,
  getOneById,
} = require('../../services/entryService/entry.service');
const { ENTRY_NOT_FOUND } = require('../../utils/error.messages');
const { NO_CONTENT } = require('../../utils/statusCode');
const s3Delete = require('../../utils/S3-AWS/s3Delete');

const deleteById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw boom.badRequest(errors.array()[0].msg);
  }

  const { id } = req.params;
  const entry = await getOneById(id);
  if (!entry) {
    throw boom.notFound(ENTRY_NOT_FOUND);
  }
  await s3Delete(entry.image);
  await deleteOneById(id);
  res.status(NO_CONTENT).json();
};

module.exports = deleteById;
