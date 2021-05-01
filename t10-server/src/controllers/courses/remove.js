const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const { Courses } = require('../../models/index');
const message = require('../../utils/error.messages');
const s3Delete = require('../../utils/S3-AWS/s3Delete');
const { NO_CONTENT } = require('../../utils/statusCode');

const remove = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw boom.badRequest(errors.array()[0].msg);
  }
  const { id } = req.params;
  const course = await Courses.findOne({ where: { id } });
  if (!course) {
    throw boom.badRequest(message.COURSE_ID);
  }
  s3Delete(course.dataValues.image);
  await Courses.destroy({ where: { id } });
  res.status(NO_CONTENT).json();
};

module.exports = remove;
