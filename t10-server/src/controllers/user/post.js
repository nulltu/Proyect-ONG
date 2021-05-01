const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const { Users } = require('../../models/index');
const createNewUser = require('../../utils/createNewUser');
const newUserData = require('../../utils/newUserData');
const { CREATE } = require('../../utils/statusCode');

const post = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw boom.badRequest(errors.array()[0].msg);
  }

  const newUser = await createNewUser(req.body, req.body.roleId, true);
  const data = await Users.create(newUser);
  return res.status(CREATE).send(newUserData(data));
};

module.exports = post;
