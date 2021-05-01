const { Organization } = require('../../models/index');
const { OK } = require('../../utils/statusCode');

const getOrgs = async (req, res) => {
  const data = await Organization.findAll({
    attributes: [
      'id',
      'name',
      'image',
      'description',
      'email',
      'phone',
      'address',
      'welcomeText',
      'instaUrl',
      'facebookUrl',
      'twitterUrl',
    ],
  });
  res.status(OK).send(data);
};

module.exports = getOrgs;
