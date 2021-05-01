const { Token } = require('../../models/index');
const { NO_CONTENT } = require('../../utils/statusCode');

const logout = async (req, res) => {
  const { tokenKey } = req.token;

  await Token.destroy({ where: { tokenKey } });

  return res.status(NO_CONTENT).json();
};

module.exports = logout;
