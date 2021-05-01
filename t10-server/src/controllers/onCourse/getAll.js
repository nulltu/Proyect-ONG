const { OnCourse } = require('../../models/index');
const { OK } = require('../../utils/statusCode');

const getAll = async (req, res) => {
  const data = await OnCourse.findAll();
  return res.status(OK).json(data);
};

module.exports = getAll;
