const { check } = require('express-validator');
const axios = require('axios');
const message = require('../utils/error.messages');

const CAPTCHA_BASEURL = 'https://www.google.com/recaptcha/api/siteverify';
const enviroments = ['test'];
const { NODE_ENV } = process.env;

let body = [];

if (!enviroments.includes(NODE_ENV)) {
  body = [
    check('captcha')
      .notEmpty()
      .withMessage(message.CAPTCHA_EMPTY)
      .custom(async (captcha) => {
        const secret = process.env.RECAPTCHA_SECRET_KEY;
        const response = await axios.default.post(
          `${CAPTCHA_BASEURL}?secret=${secret}&response=${captcha}`,
        );
        if (!response.data.success) {
          throw message.CAPTCHA_ERROR;
        }

        return true;
      })
      .withMessage(message.CAPTCHA_ERROR),
  ];
}

module.exports = body;
