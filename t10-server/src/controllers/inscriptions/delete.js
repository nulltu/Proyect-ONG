const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const { Inscriptions } = require('../../models/index');
const message = require('../../utils/error.messages');
const { NO_CONTENT } = require('../../utils/statusCode');

const remove = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw boom.badRequest(errors.array()[0].msg);
  }
  const { id } = req.params;
  const removed = await Inscriptions.destroy({ where: { id } });
  if (removed) {
    return res.status(NO_CONTENT).json();
  }
  throw boom.badRequest(message.INSCRIPTION_ID);
};

module.exports = remove;
