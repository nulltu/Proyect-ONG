const { Token } = require('../../models/index');
const { NO_CONTENT } = require('../../utils/statusCode');

const invalidateToken = async (req, res) => {
  const { id } = req.params;

  await Token.destroy({ where: { userId: id } });

  return res.status(NO_CONTENT).send();
};

module.exports = invalidateToken;
