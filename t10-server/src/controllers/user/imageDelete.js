const boom = require('@hapi/boom');
const { Users } = require('../../models/index');
const message = require('../../utils/error.messages');
const { userImage } = require('../../utils/S3-AWS/defaultImages');
const { NO_CONTENT } = require('../../utils/statusCode');
const s3Delete = require('../../utils/S3-AWS/s3Delete');

const imageDelete = async (req, res) => {
  const { id } = req.user;

  const user = await Users.findOne({ where: { id } });
  if (!user) {
    throw boom.notFound(message.ID_NOT_FOUND);
  }

  await s3Delete(user.image);

  await Users.update({ image: userImage }, { where: { id } });
  return res.status(NO_CONTENT).send();
};

module.exports = imageDelete;
