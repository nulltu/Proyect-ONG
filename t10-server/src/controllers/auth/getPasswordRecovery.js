const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const { PasswordRecoveries } = require('../../models');
const { OK } = require('../../utils/statusCode');
const message = require('../../utils/error.messages');

const getPasswordRecovery = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw boom.badRequest(errors.array()[0].msg);
  }
  const { token } = req.params;
  const data = await PasswordRecoveries.findOne({ where: { token } });
  if (data && data.expireToken > Date.now()) {
    return res.status(OK).json(data);
  }
  throw boom.badRequest(message.ID_NOT_VALID);
};

module.exports = getPasswordRecovery;
