const updateCourse = (body) => ({
  name: body.name,
  description: body.description,
  duration: +body.duration,
  ...(body.image ? { image: body.image } : {}),
});

module.exports = updateCourse;
