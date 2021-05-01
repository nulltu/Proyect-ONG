const { Model } = require('sequelize');

const slide = (sequelize, DataTypes) => {
  class Slide extends Model {
    static associate(models) {
      Slide.belongsTo(models.Organization, { as: 'organization' });
    }
  }
  Slide.init(
    {
      image: DataTypes.STRING,
      organizationId: DataTypes.INTEGER,
      description: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Slides',
      paranoid: true,
    },
  );
  return Slide;
};

module.exports = slide;
