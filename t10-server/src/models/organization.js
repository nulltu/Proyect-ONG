const { Model } = require('sequelize');

const organization = (sequelize, DataTypes) => {
  class Organization extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {}
  }
  Organization.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      welcomeText: DataTypes.STRING,
      instaUrl: DataTypes.STRING,
      facebookUrl: DataTypes.STRING,
      twitterUrl: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Organization',
    },
  );
  return Organization;
};

module.exports = organization;
