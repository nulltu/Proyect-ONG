const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const unlinkFile = require('../../utils/S3-AWS/unlinkFile');
const { Slides } = require('../../models/index');
const { CREATE } = require('../../utils/statusCode');
const s3Upload = require('../../utils/S3-AWS/s3Upload');
const { folderSlides } = require('../../utils/S3-AWS/folderNames');

const createSlide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await unlinkFile(req);
    throw boom.badRequest(errors.array()[0].msg);
  }
  await s3Upload(req, folderSlides);
  const { organizationId, description } = req.body;
  const newSlide = {
    image: req.body.image,
    organizationId,
    description,
  };
  await Slides.create(newSlide);
  res.status(CREATE).json();
};

module.exports = createSlide;
