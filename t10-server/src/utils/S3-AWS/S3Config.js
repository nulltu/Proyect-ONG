const AWS = require('aws-sdk');
const { AWS_SERVICE } = require('../../../config/config');

const { ACCESS_KEY_ID, SECRET_ACCESS_KEY } = AWS_SERVICE;

const s3 = new AWS.S3({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
});

module.exports = s3;
