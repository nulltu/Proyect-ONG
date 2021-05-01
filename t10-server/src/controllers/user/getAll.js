const { Users } = require('../../models/index');
const newUserData = require('../../utils/newUserData');
const { OK } = require('../../utils/statusCode');
const userFinder = require('../../utils/userFinder');
const userFilter = require('../../utils/userFilter');

const getAll = async (req, res) => {
  const { search, role } = req.query;
  const data = await Users.findAll({
    where: {
      ...(search ? userFinder(search) : {}),
      ...(role ? userFilter(role) : {}),
    },
  });
  const newData = data.map(newUserData);
  return res.status(OK).send(await newData);
};

module.exports = getAll;
