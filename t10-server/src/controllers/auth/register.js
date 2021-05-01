const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const templates = require('../../utils/mailUtils/templates');
const { Users } = require('../../models/index');
const { CREATE } = require('../../utils/statusCode');
const config = require('../../utils/mailUtils/config');
const Mailer = require('../../services/mailService/Mailer');
const createAuthToken = require('../../utils/createAuthToken');
const message = require('../../utils/error.messages');
const createNewUser = require('../../utils/createNewUser');

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw boom.badRequest(errors.array()[0].msg);
  }
  const enviroments = ['production'];
  const { NODE_ENV } = process.env;
  const roleId = enviroments.includes(NODE_ENV) ? 2 : 1;
  const { email } = req.body;
  const newUser = await createNewUser(req.body, roleId);
  const createdUser = await Users.create(newUser);
  const token = createAuthToken(createdUser);

  const http = `${process.env.HTTP}autenticar-correo/${token}`;
  const { subject, html } = templates.validateAccount(email, http);
  const mail = new Mailer(config);
  const send = await mail.send({ to: email, subject, html });

  if (!send) {
    throw boom.badGateway(message.EMAIL_ERROR);
  }
  return res.status(CREATE).send();
};

module.exports = register;
