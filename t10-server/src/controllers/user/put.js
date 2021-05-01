const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const { Users } = require('../../models/index');
const message = require('../../utils/error.messages');
const newUserData = require('../../utils/newUserData');
const updateUser = require('../../utils/updateUser');
const s3Update = require('../../utils/S3-AWS/s3Update');
const unlinkFile = require('../../utils/S3-AWS/unlinkFile');
const { folderUsers } = require('../../utils/S3-AWS/folderNames');
const { OK } = require('../../utils/statusCode');

const put = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    unlinkFile(req);
    throw boom.badRequest(errors.array()[0].msg);
  }
  const { id } = req.user;

  const user = await Users.findOne({ where: { id } });
  if (user) {
    await s3Update(req, folderUsers, user.image);
    await Users.update(updateUser(req.body), {
      where: { id },
    });
    return res.status(OK).send(newUserData(req.body));
  }
  throw boom.notFound(message.ID_NOT_FOUND);
};

module.exports = put;
