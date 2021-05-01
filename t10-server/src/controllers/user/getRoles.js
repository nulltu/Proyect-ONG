const { Roles } = require('../../models/index');
const { OK } = require('../../utils/statusCode');

const getAll = async (req, res) => {
  const roles = await Roles.findAll();
  return res.status(OK).send(roles);
};

module.exports = getAll;
