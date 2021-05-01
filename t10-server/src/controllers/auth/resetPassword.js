const crypto = require('crypto');
const boom = require('@hapi/boom');
const { Users, PasswordRecoveries } = require('../../models');
const Mailer = require('../../services/mailService/Mailer');
const templates = require('../../utils/mailUtils/templates');
const config = require('../../utils/mailUtils/config');
const { ACCEPTED } = require('../../utils/statusCode');
const message = require('../../utils/error.messages');
// const passwordRecoveryModel = require('../../models/passwordrecovery');

const resetPassword = async (req, res) => {
  crypto.randomBytes(32, async (err, buffer) => {
    if (err) {
      return err;
    }
    let token = buffer.toString('hex');
    const user = await Users.findOne({ where: { email: req.body.email } });
    if (!user) {
      throw boom.badRequest(message.USER_DONT_EXIST);
    }
    const userIdExistent = await PasswordRecoveries.findOne({
      where: { userId: user.id },
    });
    if (userIdExistent) {
      token = userIdExistent.token;
      await PasswordRecoveries.update(
        {
          expireToken: Date.now() + 3600000,
        },
        { where: { userId: user.id } },
      );
    } else {
      await PasswordRecoveries.create({
        userId: user.id,
        token,
        expireToken: Date.now() + 3600000,
        state: 1,
      });
    }

    const username = user.firstName;
    const link = `${process.env.HTTP}password-recovery/${token}`;
    const { email: to } = req.body;
    const { subject, html } = templates.recoverPassword(username, link);

    const mail = new Mailer(config);
    const send = await mail.send({ to, subject, html });

    if (!send) {
      throw boom.badGateway(message.EMAIL_ERROR);
    }
    return res.status(ACCEPTED).json();
  });
};

module.exports = resetPassword;
