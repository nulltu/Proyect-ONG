const base64 = require('base-64');
const { entryImage } = require('../S3-AWS/defaultImages');

const createNewEntry = (body) => {
  const { title, content, image, typeId } = body;

  return {
    title,
    content: base64.encode(content),
    image: image || entryImage,
    typeId,
  };
};

module.exports = createNewEntry;
