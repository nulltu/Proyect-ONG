const { Model } = require('sequelize');

const theme = (sequelize, DataTypes) => {
  class Theme extends Model {
    static associate() {}
  }
  Theme.init(
    {
      name: DataTypes.STRING,
      backgroundColor: DataTypes.STRING,
      borderColor: DataTypes.STRING,
      tableColor: DataTypes.STRING,
      headerColor: DataTypes.STRING,
      primaryColor: DataTypes.STRING,
      lettersColor: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Theme',
    },
  );
  return Theme;
};

module.exports = theme;
