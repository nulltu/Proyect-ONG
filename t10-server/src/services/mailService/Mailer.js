const nodemailer = require('nodemailer');

class Mailer {
  constructor({ user, clientId, clientSecret, refreshToken, accessToken }) {
    this.user = user;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.refreshToken = refreshToken;
    this.accessToken = accessToken;
  }

  transporter() {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.user,
        clientId: this.clientId,
        clientSecret: this.clientSecret,
        refreshToken: this.refreshToken,
        accessToken: this.accessToken,
      },
    });
  }

  send({ to, subject, html }) {
    return new Promise((resolve) => {
      const mailOptions = {
        from: this.user,
        to,
        subject,
        html,
      };
      const transporter = this.transporter();
      transporter.sendMail(mailOptions, (error) => resolve(!error));
    });
  }
}

module.exports = Mailer;
