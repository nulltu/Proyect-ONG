const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const newUserData = require('../../utils/newUserData');
const { Users } = require('../../models/index');
const message = require('../../utils/error.messages');
const { OK } = require('../../utils/statusCode');

const getById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw boom.badRequest(errors.array()[0].msg);
  }
  const { id } = req.params;
  const user = await Users.findByPk(id);
  if (user) {
    return res.status(OK).send(newUserData(user));
  }
  throw boom.notFound(message.ID_NOT_FOUND);
};

module.exports = getById;
