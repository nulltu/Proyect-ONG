const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const { Courses } = require('../../models');
const message = require('../../utils/error.messages');
const updateCourse = require('../../utils/updateCourse');
const { CREATE } = require('../../utils/statusCode');
const s3Update = require('../../utils/S3-AWS/s3Update');
const unlinkFile = require('../../utils/S3-AWS/unlinkFile');
const { folderCourses } = require('../../utils/S3-AWS/folderNames');

const put = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await unlinkFile(req);
    throw boom.badRequest(errors.array()[0].msg);
  }
  const { id } = req.params;
  const existing = await Courses.findByPk(id);
  if (!existing) {
    await unlinkFile(req);
    throw boom.badRequest(message.COURSE_ID);
  }
  await s3Update(req, folderCourses, existing.image);
  await Courses.update(updateCourse(req.body), { where: { id } });
  res.status(CREATE).json({ ...existing.dataValues, ...req.body });
};

module.exports = put;
