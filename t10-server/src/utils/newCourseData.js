const { courseImage } = require('./S3-AWS/defaultImages');

const newCourseData = (body) => ({
  name: body.name,
  description: body.description,
  image: body.image || courseImage,
  duration: +body.duration,
});

module.exports = newCourseData;
