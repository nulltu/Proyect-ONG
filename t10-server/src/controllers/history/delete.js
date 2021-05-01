const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const { History } = require('../../models/index');
const message = require('../../utils/error.messages');
const { NO_CONTENT } = require('../../utils/statusCode');

const remove = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw boom.badRequest(errors.array()[0].msg);
  }
  const { id } = req.params;
  const deleted = await History.destroy({ where: { id } });
  if (deleted) {
    return res.status(NO_CONTENT).send();
  }
  throw boom.notFound(message.ID_NOT_FOUND);
};

module.exports = remove;
