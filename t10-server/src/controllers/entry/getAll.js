const boom = require('@hapi/boom');
const {
  getAllEntries,
  getEntryType,
} = require('../../services/entryService/entry.service');
const getEntryData = require('../../utils/entry/getEntryData');
const { OK } = require('../../utils/statusCode');

const getAll = async (req, res) => {
  const { type } = req.query;
  const entryType = await getEntryType(type);
  if (!entryType && type) {
    throw boom.notFound();
  }
  const entries = await getAllEntries(entryType?.id || undefined);
  const getEntriesData = await entries.map(getEntryData);
  return res.status(OK).json(getEntriesData);
};

module.exports = getAll;
