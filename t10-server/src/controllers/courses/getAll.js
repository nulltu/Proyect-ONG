const { Courses, OnCourse } = require('../../models');
const { OK } = require('../../utils/statusCode');

const getAll = async (req, res) => {
  const onCourses = req?.query.onCourses || undefined;
  const data = await Courses.findAll(
    onCourses
      ? {
          include: [{ model: OnCourse, as: 'OnCourses' }],
        }
      : undefined,
  );
  return res.status(OK).json(data);
};

module.exports = getAll;
