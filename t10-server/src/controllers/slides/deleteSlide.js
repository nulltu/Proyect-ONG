const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const { Slides } = require('../../models/index');
const { ID_NOT_FOUND } = require('../../utils/error.messages');
const { OK } = require('../../utils/statusCode');
const s3Delete = require('../../utils/S3-AWS/s3Delete');

const deleteSlide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw boom.badRequest(errors.array()[0].msg);
  }
  const { id } = req.params;
  const slide = await Slides.findOne({ where: { id } });
  if (slide) {
    await Slides.destroy({ where: { id } });
    await s3Delete(slide.dataValues.image);
    return res.status(OK).send();
  }
  throw boom.notFound(ID_NOT_FOUND);
};

module.exports = deleteSlide;
