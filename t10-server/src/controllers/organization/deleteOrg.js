const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const { Organization } = require('../../models/index');
const { CREATE } = require('../../utils/statusCode');
const s3Delete = require('../../utils/S3-AWS/s3Delete');

async function deleteNew(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw boom.badRequest(errors.array()[0].msg);
  }
  const { id } = req.params;
  const organization = await Organization.findOne({ where: { id } });
  if (!organization) {
    throw boom.notFound();
  }
  s3Delete(organization.image);
  await Organization.destroy({ where: { id } });
  res.status(CREATE).json();
}

module.exports = deleteNew;
