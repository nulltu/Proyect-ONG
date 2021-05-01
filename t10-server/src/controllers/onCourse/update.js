const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const { Courses, OnCourse } = require('../../models');
const message = require('../../utils/error.messages');
const { CREATE } = require('../../utils/statusCode');

async function update(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw boom.badRequest(errors.array()[0].msg);
  }
  const { id } = req.params;
  const { courseId, date, schedule } = req.body;
  const existCourse = await Courses.findOne({ where: { id: courseId } });
  if (!existCourse) {
    throw boom.badRequest(message.COURSE_ID);
  }

  await OnCourse.update({ courseId, date, schedule }, { where: { id } });

  const existing = await OnCourse.findByPk(id);

  if (existing) {
    return res.status(CREATE).json(existing);
  }
  throw boom.notFound(message.ONCOURSE_ID);
}

module.exports = update;
