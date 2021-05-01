const updateOrgData = (org) => ({
  name: org.name,
  description: org.description,
  phone: org.phone,
  address: org.address,
  welcomeText: org.welcomeText,
  instaUrl: org.instaUrl,
  facebookUrl: org.facebookUrl,
  twitterUrl: org.twitterUrl,
  ...(org.image ? { image: org.image } : {}),
});

module.exports = updateOrgData;
