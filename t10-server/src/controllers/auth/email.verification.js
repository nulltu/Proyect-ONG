const { Users } = require('../../models/index');
const { OK } = require('../../utils/statusCode');

const emailVerification = async (req, res) => {
  const { id } = req.user;
  await Users.update({ emailVerified: true }, { where: { id } });
  return res.status(OK).send();
};

module.exports = emailVerification;
