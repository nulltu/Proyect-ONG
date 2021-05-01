const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const { Organization } = require('../../models/index');
const newOrgData = require('../../utils/newOrgData');
const { CREATE } = require('../../utils/statusCode');
const s3Upload = require('../../utils/S3-AWS/s3Upload');
const unlinkFile = require('../../utils/S3-AWS/unlinkFile');
const { folderOrganization } = require('../../utils/S3-AWS/folderNames');

async function createOrg(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await unlinkFile(req);
    throw boom.badRequest(errors.array()[0].msg);
  }
  await s3Upload(req, folderOrganization);
  const orgData = newOrgData(req.body);
  const data = await Organization.create(orgData);
  res.status(CREATE).json({ body: { id: data.dataValues.id } });
}

module.exports = createOrg;
