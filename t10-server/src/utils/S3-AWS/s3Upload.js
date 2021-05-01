const fs = require('fs').promises;
const { uploadImage } = require('../../services/S3/S3.service');

const upload = async (req, folder) => {
  delete req.body.image;
  if (req.file) {
    const file = await fs.readFile(req.file.path);
    const result = await uploadImage(folder, req.file.filename, file);
    req.body.image = result.Location;
    await fs.unlink(req.file.path);
  }
};

module.exports = upload;
