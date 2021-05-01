const s3 = require('../../utils/S3-AWS/S3Config');
const { AWS_SERVICE } = require('../../../config/config');

const { BUCKET_NAME } = AWS_SERVICE;

const uploadImage = async (folder, key, body) => {
  const bucketParams = {
    Bucket: `${BUCKET_NAME}/${folder}`,
    Key: key,
    Body: body,
    ACL: 'public-read',
  };

  const upload = await s3.upload(bucketParams).promise();
  return upload;
};

const deleteImage = async (folder, key) => {
  const bucketParams = {
    Bucket: `${BUCKET_NAME}/${folder}`,
    Key: key,
  };

  const deleteFile = await s3.deleteObject(bucketParams).promise();
  return deleteFile;
};

module.exports = { uploadImage, deleteImage };
