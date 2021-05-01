const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const { Slides } = require('../../models/index');
const { ID_NOT_FOUND } = require('../../utils/error.messages');
const { OK } = require('../../utils/statusCode');

const updateSlide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw boom.badRequest(errors.array()[0].msg);
  }
  const { id } = req.params;
  const slide = await Slides.findOne({ where: { id } });
  if (slide) {
    const { organizationId, description } = req.body;
    const updatedSlide = { organizationId, description };
    await Slides.update(updatedSlide, { where: { id } });
    res.status(OK).json();
  }
  throw boom.notFound(ID_NOT_FOUND);
};

module.exports = updateSlide;
