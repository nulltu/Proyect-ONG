const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const { OnCourse, Courses } = require('../../models/index');
const message = require('../../utils/error.messages');
const { CREATE } = require('../../utils/statusCode');

const ACTIVE = 1;

async function create(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const validationError = boom.badRequest(errors.array()[0].msg);
    throw validationError;
  }

  const { date, courseId, schedule } = req.body;
  const existCourse = await Courses.findOne({ where: { id: courseId } });
  if (!existCourse) {
    throw boom.badRequest(message.COURSE_ID);
  }
  const data = await OnCourse.create({
    courseId,
    date,
    schedule,
    active: ACTIVE,
  });

  res.status(CREATE).json(data.dataValues);
}

module.exports = create;
