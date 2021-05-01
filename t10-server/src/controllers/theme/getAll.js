const { Theme } = require('../../models/index');
const { OK } = require('../../utils/statusCode');

const getAll = async (req, res) => {
  const data = await Theme.findAll();
  return res.status(OK).send(data);
};

module.exports = getAll;
