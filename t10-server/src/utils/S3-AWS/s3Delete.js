const { deleteImage } = require('../../services/S3/S3.service');
const defaultImages = require('./defaultImages');

const upload = async (s3Url) => {
  if (!Object.values(defaultImages).includes(s3Url)) {
    const url = new URL(s3Url);
    const [folder, key] = url.pathname.split('/').filter((e) => e);

    await deleteImage(folder, key);
  }
};

module.exports = upload;
