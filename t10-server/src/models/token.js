const { Model } = require('sequelize');

const token = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      Token.belongsTo(models.Users, { as: 'user' });
    }
  }
  Token.init(
    {
      tokenKey: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Token',
    },
  );
  return Token;
};

module.exports = token;
