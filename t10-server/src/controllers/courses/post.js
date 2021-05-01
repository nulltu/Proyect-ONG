const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const { Courses } = require('../../models');
const newCourseData = require('../../utils/newCourseData');
const { CREATE } = require('../../utils/statusCode');
const s3Upload = require('../../utils/S3-AWS/s3Upload');
const unlinkFile = require('../../utils/S3-AWS/unlinkFile');
const { folderCourses } = require('../../utils/S3-AWS/folderNames');

const post = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await unlinkFile(req);
    throw boom.badRequest(errors.array()[0].msg);
  }
  await s3Upload(req, folderCourses);
  const newCourse = newCourseData(req.body);
  const data = await Courses.create(newCourse);

  return res.status(CREATE).send(data);
};

module.exports = post;
