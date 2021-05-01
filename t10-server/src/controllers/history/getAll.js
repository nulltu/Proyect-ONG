const base64 = require('base-64');
const { History } = require('../../models/index');
const { OK } = require('../../utils/statusCode');

const decode = (data) => {
  const { id, text, image } = data;
  return { id, text: base64.decode(text), image };
};

const getAll = async (req, res) => {
  const data = await History.findAll();
  return res.status(OK).send(data.map(decode));
};

module.exports = getAll;
