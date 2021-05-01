const fs = require('fs').promises;

const unlinkFile = async (req) => {
  if (req.file) {
    fs.unlink(req.file.path);
  }
};

module.exports = unlinkFile;
