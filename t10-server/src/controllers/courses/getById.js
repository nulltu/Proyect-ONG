const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const { Courses } = require('../../models');
const { OK } = require('../../utils/statusCode');
const message = require('../../utils/error.messages');

const getAll = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw boom.badRequest(errors.array()[0].msg);
  }
  const { id } = req.params;
  const data = await Courses.findOne({ where: { id } });
  if (data) {
    return res.status(OK).json(data);
  }
  throw boom.badRequest(message.COURSE_ID);
};

module.exports = getAll;
