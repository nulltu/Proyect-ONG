const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { PasswordRecoveries, Users } = require('../../models');
const { OK } = require('../../utils/statusCode');
const message = require('../../utils/error.messages');

const postPasswordRecovery = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw boom.badRequest(errors.array()[0].msg);
  }
  const { token, password } = req.body;
  const data = await PasswordRecoveries.findOne({ where: { token } });
  if (data) {
    const { userId } = data;
    const salt = await bcrypt.genSalt(10);
    const encryptPass = await bcrypt.hash(password, salt);
    await Users.update(
      { password: encryptPass },
      {
        where: { id: userId },
      },
    );
    await PasswordRecoveries.destroy({ where: { token } });
    return res.status(OK).json(data);
  }
  throw boom.badRequest(message.COURSE_ID);
};

module.exports = postPasswordRecovery;
