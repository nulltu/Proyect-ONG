const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const { Inscriptions } = require('../../models');
const message = require('../../utils/error.messages');
const { CREATE } = require('../../utils/statusCode');

const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw boom.badRequest(errors.array()[0].msg);
  }

  const { id } = req.user;
  const { onCourseId } = req.body;

  const isInscripted = await Inscriptions.findOne({
    where: { onCourseId, userId: +id },
  });
  if (isInscripted) {
    throw boom.badRequest(message.ALREADY_INSCRIPTED);
  }
  const data = await Inscriptions.create({
    onCourseId,
    userId: +id,
  });
  return res.status(CREATE).send(data);
};

module.exports = create;
