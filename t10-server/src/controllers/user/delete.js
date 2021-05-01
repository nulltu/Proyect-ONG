const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const { Users, Token } = require('../../models/index');
const message = require('../../utils/error.messages');
const { NO_CONTENT } = require('../../utils/statusCode');
const s3Delete = require('../../utils/S3-AWS/s3Delete');

const remove = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw boom.badRequest(errors.array()[0].msg);
  }
  const { id } = req.params;

  const user = await Users.findOne({ where: { id } });
  if (!user) {
    throw boom.notFound(message.ID_NOT_FOUND);
  }

  await s3Delete(user.image);
  await Users.destroy({ where: { id } });
  await Token.destroy({ where: { userId: id } });
  return res.status(NO_CONTENT).send();
};

module.exports = remove;
