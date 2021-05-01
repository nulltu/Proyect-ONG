const s3Upload = require('./s3Upload');
const s3Delete = require('./s3Delete');

const upload = async (req, folder, url) => {
  delete req.body.image;
  if (req.file) {
    await s3Delete(url);
    await s3Upload(req, folder);
  }
};

module.exports = upload;
