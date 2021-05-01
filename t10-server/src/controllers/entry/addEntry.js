const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const { createEntry } = require('../../services/entryService/entry.service');
const createNewEntry = require('../../utils/entry/createNewEntry');
const newEntryData = require('../../utils/entry/newEntryData');
const { CREATE } = require('../../utils/statusCode');
const s3Upload = require('../../utils/S3-AWS/s3Upload');
const unlinkFile = require('../../utils/S3-AWS/unlinkFile');
const { folderEntries } = require('../../utils/S3-AWS/folderNames');

const addEntry = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await unlinkFile(req);
    throw boom.badRequest(errors.array()[0].msg);
  }
  await s3Upload(req, folderEntries);
  const newEntry = createNewEntry(req.body);
  const entryData = await createEntry(newEntry);
  res.status(CREATE).json(newEntryData(entryData));
};

module.exports = addEntry;
