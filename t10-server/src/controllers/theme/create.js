const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const { Theme } = require('../../models/index');
const createNewTheme = require('../../utils/createNewTheme');
const { CREATE } = require('../../utils/statusCode');
const message = require('../../utils/error.messages');

const post = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw boom.badRequest(errors.array()[0].msg);
  }
  const { name } = req.body;
  const theme = await Theme.findAll({ where: { name } });
  if (!theme.length) {
    const newTheme = await createNewTheme(req.body);
    const data = await Theme.create(newTheme);
    return res.status(CREATE).send(data);
  }
  throw boom.badRequest(message.THEME_NAME_EXIST);
};

module.exports = post;
