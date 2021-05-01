const { validationResult } = require('express-validator');
const base64 = require('base-64');
const boom = require('@hapi/boom');
const { History } = require('../../models/index');
const { CREATE } = require('../../utils/statusCode');
const unlinkFile = require('../../utils/S3-AWS/unlinkFile');
const s3Upload = require('../../utils/S3-AWS/s3Upload');
const { folderHistory } = require('../../utils/S3-AWS/folderNames');

const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await unlinkFile(req);
    const validationError = boom.badRequest(errors.array()[0].msg);
    throw validationError;
  }
  await s3Upload(req, folderHistory);
  const { text } = req.body;
  const data = await History.create({
    text: base64.encode(text),
    image: req.body.image,
  });
  return res.status(CREATE).send(data);
};

module.exports = create;
