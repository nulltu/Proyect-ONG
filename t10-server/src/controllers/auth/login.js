const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const bcript = require('bcrypt');
const { Users, Token } = require('../../models/index');
const createNewToken = require('../../utils/createNewToken');
const message = require('../../utils/error.messages');
const newUserData = require('../../utils/newUserData');
const createRefreshToken = require('../../utils/createRefreshToken');
const { OK } = require('../../utils/statusCode');

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw boom.badRequest(errors.array()[0].msg);
  }
  const { email, password } = req.body;
  const user = await Users.findAll({ where: { email } });

  if (user.length) {
    if (bcript.compareSync(password, user[0].password)) {
      const tokenKey = Math.random();
      const refreshToken = createRefreshToken(tokenKey);
      await Token.create({ tokenKey, userId: user[0].id });
      return res.status(OK).json({
        access_token: createNewToken(user[0]),
        token_type: 'Bearer',
        expires_in: process.env.JWT_LIFETIME,
        user: newUserData(user[0]),
        refresh_token: refreshToken,
      });
    }

    throw boom.badRequest(message.INCORRECT_PASSWORD);
  }
  throw boom.notFound(message.USER_NOT_FOUND);
};

module.exports = login;
