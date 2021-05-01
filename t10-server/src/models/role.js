const { Model } = require('sequelize');

const role = (sequelize, DataTypes) => {
  class Role extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {}
  }
  Role.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Roles',
      paranoid: true,
    },
  );
  return Role;
};

module.exports = role;
