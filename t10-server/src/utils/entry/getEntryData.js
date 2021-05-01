const base64 = require('base-64');

const newEntryData = (data) => ({
  id: data.id,
  title: data.title,
  content: base64.decode(data.content),
  image: data.image,
  categoryId: data.categoryId,
  typeId: data.typeId,
  type: data.type.type,
  createdAt: data.createdAt,
});

module.exports = newEntryData;
