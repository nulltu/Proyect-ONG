const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const { Theme } = require('../../models/index');
const message = require('../../utils/error.messages');
const createNewTheme = require('../../utils/createNewTheme');
const { OK } = require('../../utils/statusCode');

const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw boom.badRequest(errors.array()[0].msg);
  }
  const { id } = req.params;

  const { name } = req.body;
  const theme = await Theme.findAll({ where: { name } });
  if (!theme.length) {
    const updated = await Theme.update(await createNewTheme(req.body), {
      where: { id },
    });
    if (updated) {
      return res.status(OK).send(req.body);
    }
    throw boom.notFound(message.ID_NOT_FOUND);
  }
  throw boom.badRequest(message.THEME_NAME_EXIST);
};

module.exports = update;
