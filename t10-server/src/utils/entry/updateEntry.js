const base64 = require('base-64');

const createNewEntry = (body) => ({
  title: body.title,
  content: base64.encode(body.content),
  typeId: +body.typeId,
  ...(body.image ? { image: body.image } : {}),
});

module.exports = createNewEntry;
