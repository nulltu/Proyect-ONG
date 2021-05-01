const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const templates = require('../../utils/mailUtils/templates');
const { ACCEPTED } = require('../../utils/statusCode');
const config = require('../../utils/mailUtils/config');
const Mailer = require('../../services/mailService/Mailer');
const createAuthToken = require('../../utils/createAuthToken');
const message = require('../../utils/error.messages');

const sendEmailVerification = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw boom.badRequest(errors.array()[0].msg);
  }

  const { email } = req.user;

  const token = createAuthToken(req.user);

  const http = `${process.env.HTTP}autenticar-correo/${token}`;
  const { subject, html } = templates.validateAccount(email, http);
  const mail = new Mailer(config);
  const send = await mail.send({ to: email, subject, html });

  if (!send) {
    throw boom.badGateway(message.EMAIL_ERROR);
  }
  return res.status(ACCEPTED).send();
};

module.exports = sendEmailVerification;
