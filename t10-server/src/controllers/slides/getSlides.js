const { Slides } = require('../../models/index');
const newSlideData = require('../../utils/newSlideData');
const { OK } = require('../../utils/statusCode');

const getSlides = async (req, res) => {
  const data = await Slides.findAll();
  const newData = data.map(newSlideData);
  res.status(OK).json(newData);
};

module.exports = getSlides;
