const { Inscriptions, Users, OnCourse, Courses } = require('../../models');
const { OK } = require('../../utils/statusCode');

const getAll = async (req, res) => {
  const onCourseId = req?.query.onCourseId || undefined;
  const data = await Inscriptions.findAll(
    onCourseId
      ? {
          where: { onCourseId },
          attributes: ['id', 'onCourseId', 'createdAt'],
          include: [
            {
              model: Users,
              as: 'user',
              attributes: ['firstName', 'lastName', 'email'],
            },
          ],
        }
      : {
          attributes: ['id', 'createdAt'],
          include: [
            {
              model: Users,
              as: 'user',
              attributes: ['firstName', 'lastName', 'email'],
            },
            {
              model: OnCourse,
              as: 'onCourse',
              attributes: ['schedule', 'id'],
              include: [
                { model: Courses, as: 'Course', attributes: ['name', 'id'] },
              ],
            },
          ],
        },
  );
  return res.status(OK).send(data);
};

module.exports = getAll;
