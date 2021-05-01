const { Model } = require('sequelize');

const history = (sequelize, DataTypes) => {
  class History extends Model {
    static associate() {}
  }
  History.init(
    {
      text: DataTypes.TEXT,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'History',
    },
  );
  return History;
};
module.exports = history;
