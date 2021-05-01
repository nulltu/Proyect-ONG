const { getAllTypes } = require('../../services/entryService/entry.service');
const { OK } = require('../../utils/statusCode');

const getTypes = async (req, res) => {
  const types = await getAllTypes();

  res.status(OK).json(types);
};

module.exports = getTypes;
