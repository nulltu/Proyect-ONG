const { Model } = require('sequelize');

const passwordRecoveryModel = (sequelize, DataTypes) => {
  class passwordRecovery extends Model {
    static associate(models) {
      passwordRecovery.belongsTo(models.Users, { as: 'user' });
    }
  }
  passwordRecovery.init(
    {
      token: DataTypes.STRING,
      expireToken: DataTypes.BIGINT,
      userId: DataTypes.INTEGER,
      state: DataTypes.TINYINT,
    },
    {
      sequelize,
      modelName: 'PasswordRecoveries',
    },
  );
  return passwordRecovery;
};

module.exports = passwordRecoveryModel;
