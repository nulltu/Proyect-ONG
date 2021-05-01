const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const { Users } = require('../../models/index');
const message = require('../../utils/error.messages');
const newUserData = require('../../utils/newUserData');
const updateUserAdmin = require('../../utils/updateUserAdmin');
const { OK } = require('../../utils/statusCode');

const put = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw boom.badRequest(errors.array()[0].msg);
  }
  const { id } = req.params;

  const user = await Users.findOne({ where: { id } });
  if (user) {
    await Users.update(updateUserAdmin(req.body), {
      where: { id },
    });
    return res.status(OK).send(newUserData(req.body));
  }
  throw boom.notFound(message.ID_NOT_FOUND);
};

module.exports = put;
