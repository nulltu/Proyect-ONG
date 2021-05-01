const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const { Inscriptions, OnCourse, Courses } = require('../../models');
const { OK } = require('../../utils/statusCode');

const getByUserId = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw boom.badRequest(errors.array()[0].msg);
  }

  const { id } = req.params;
  const data = await Inscriptions.findAll({
    where: { userId: id },
    attributes: ['id', 'createdAt'],
    include: [
      {
        model: OnCourse,
        as: 'onCourse',
        attributes: ['schedule', 'date'],
        include: [
          {
            model: Courses,
            as: 'Course',
            attributes: ['name', 'id', 'duration'],
          },
        ],
      },
    ],
  });
  return res.status(OK).send(data);
};

module.exports = getByUserId;
