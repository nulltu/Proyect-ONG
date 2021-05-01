const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const { Organization } = require('../../models/index');
const updateOrgData = require('../../utils/updateOrgData');
const { CREATE } = require('../../utils/statusCode');
const s3Update = require('../../utils/S3-AWS/s3Update');
const unlinkFile = require('../../utils/S3-AWS/unlinkFile');
const { folderOrganization } = require('../../utils/S3-AWS/folderNames');

async function updateOrg(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await unlinkFile(req);
    throw boom.badRequest(errors.array()[0].msg);
  }
  const { id } = req.params;
  const data = await Organization.findOne({ where: { id } });
  if (!data) {
    await unlinkFile(req);
    throw boom.notFound();
  }
  await s3Update(req, folderOrganization, data.image);
  const orgData = updateOrgData(req.body);
  await Organization.update(orgData, { where: { id } });
  res.status(CREATE).json();
}

module.exports = updateOrg;
