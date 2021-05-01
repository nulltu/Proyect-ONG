const { organizationImage } = require('./S3-AWS/defaultImages');

const newOrgData = (org) => ({
  name: org.name,
  image: org.image || organizationImage,
  description: org.description,
  phone: org.phone,
  address: org.address,
  welcomeText: org.welcomeText,
  instaUrl: org.instaUrl,
  facebookUrl: org.facebookUrl,
  twitterUrl: org.twitterUrl,
});

module.exports = newOrgData;
