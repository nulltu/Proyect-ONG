const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const {
  setUpdate,
  getOneById,
} = require('../../services/entryService/entry.service');
const { CREATE } = require('../../utils/statusCode');
const { ENTRY_BY_ID_NOT_FOUND } = require('../../utils/error.messages');
const updateEntry = require('../../utils/entry/updateEntry');
const s3Update = require('../../utils/S3-AWS/s3Update');
const unlinkFile = require('../../utils/S3-AWS/unlinkFile');
const { folderEntries } = require('../../utils/S3-AWS/folderNames');

const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await unlinkFile(req);
    throw boom.badRequest(errors.array()[0].msg);
  }
  const { id } = req.params;
  const entry = await getOneById(+id);
  if (!entry) {
    await unlinkFile(req);
    throw boom.notFound(ENTRY_BY_ID_NOT_FOUND);
  }
  await s3Update(req, folderEntries, entry.image);
  const updatedEntry = updateEntry(req.body);
  await setUpdate(updatedEntry, +id);
  res.status(CREATE).json({ ...entry.dataValues, ...updatedEntry });
};

module.exports = update;
