const { Model } = require('sequelize');

const entryType = (sequelize, DataTypes) => {
  class EntryType extends Model {
    static associate(models) {
      EntryType.hasMany(models.Entries, { foreignKey: 'typeId' });
    }
  }
  EntryType.init(
    {
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'EntriesTypes',
      timestamps: true,
    },
  );
  return EntryType;
};

module.exports = entryType;
