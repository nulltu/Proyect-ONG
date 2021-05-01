const { Model } = require('sequelize');

const user = (sequelize, DataTypes) => {
  class Inscription extends Model {
    static associate(models) {
      Inscription.belongsTo(models.OnCourse, { as: 'onCourse' });
      Inscription.belongsTo(models.Users, { as: 'user' });
    }
  }
  Inscription.init(
    {
      userId: DataTypes.INTEGER,
      onCourseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'Inscriptions',
    },
  );
  return Inscription;
};

module.exports = user;
