const { Token } = require('../../models/index');
const createRefreshToken = require('../../utils/createRefreshToken');
const createNewToken = require('../../utils/createNewToken');
const { OK } = require('../../utils/statusCode');

const refToken = async (req, res) => {
  const { tokenKey, userId } = req.token;

  await Token.destroy({ where: { tokenKey } });
  const newTokenKey = Math.random();
  const refreshToken = createRefreshToken(newTokenKey);
  await Token.create({ tokenKey: newTokenKey, userId });
  return res.status(OK).json({
    access_token: createNewToken({ id: userId }),
    token_type: 'Bearer',
    expires_in: process.env.JWT_LIFETIME,
    refresh_token: refreshToken,
  });
};

module.exports = refToken;
