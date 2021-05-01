const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const { OnCourse } = require('../../models/index');
const { NO_CONTENT } = require('../../utils/statusCode');
const message = require('../../utils/error.messages');

async function deleteNew(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw boom.badRequest(errors.array()[0].msg);
  }
  const { id } = req.params;
  const updated = await OnCourse.destroy({ where: { id } });
  if (updated) {
    return res.status(NO_CONTENT).json();
  }
  throw boom.notFound(message.ONCOURSE_ID);
}

module.exports = deleteNew;
