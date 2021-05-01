const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const base64 = require('base-64');
const { History } = require('../../models/index');
const message = require('../../utils/error.messages');
const { CREATE } = require('../../utils/statusCode');
const s3Upload = require('../../utils/S3-AWS/s3Upload');
const { folderHistory } = require('../../utils/S3-AWS/folderNames');

const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw boom.badRequest(errors.array()[0].msg);
  }
  const { id } = req.params;
  const history = await History.findOne({ where: { id } });
  if (history) {
    await s3Upload(req, folderHistory);
    const { text } = req.body;
    const newText = base64.encode(text);
    const updatedHistory = { text: newText, image: req.body.image };
    await History.update(updatedHistory, { where: { id } });
    res.status(CREATE).send(req.body);
  }
  throw boom.notFound(message.ID_NOT_FOUND);
};

module.exports = update;
