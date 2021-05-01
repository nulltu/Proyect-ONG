const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const { Organization } = require('../../models');
const Mailer = require('../../services/mailService/Mailer');
const templates = require('../../utils/mailUtils/templates');
const config = require('../../utils/mailUtils/config');
const { ACCEPTED } = require('../../utils/statusCode');
const message = require('../../utils/error.messages');

const post = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw boom.badRequest(errors.array()[0].msg);
  }
  const { name, email, question } = req.body;
  const { email: to } = await Organization.findOne();
  const { subject, html } = templates.contact(name, email, question);

  const mail = new Mailer(config);
  const send = await mail.send({ to, subject, html });

  if (!send) {
    throw boom.badGateway(message.EMAIL_ERROR);
  }
  return res.status(ACCEPTED).json();
};

module.exports = post;
