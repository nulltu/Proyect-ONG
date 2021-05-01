const { Model } = require('sequelize');

const entry = (sequelize, DataTypes) => {
  class Entry extends Model {
    static associate(models) {
      Entry.belongsTo(models.EntriesTypes, { as: 'type' });
    }
  }
  Entry.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      image: DataTypes.STRING,
      typeId: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Entries',
      paranoid: true,
      timestamps: true,
    },
  );
  return Entry;
};

module.exports = entry;
