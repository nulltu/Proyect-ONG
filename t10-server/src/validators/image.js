const { check } = require('express-validator');
const message = require('../utils/error.messages');

const mimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

const body = [
  check('file')
    .custom((value, { req }) => {
      if (req.file) {
        return mimeTypes.includes(req.file.mimetype);
      }
      return true;
    })
    .withMessage(message.INVALID_IMAGE_FORMAT),
];

module.exports = body;
