const { Model } = require('sequelize');

const user = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Roles, { as: 'role' });
      User.belongsTo(models.Organization, { as: 'organization' });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      image: DataTypes.STRING,
      password: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      organizationId: DataTypes.INTEGER,
      emailVerified: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Users',
    },
  );
  return User;
};

module.exports = user;
