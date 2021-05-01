const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OnCourse extends Model {
    static associate(models) {
      OnCourse.belongsTo(models.Courses, {
        foreignKey: 'courseId',
      });
    }
  }
  OnCourse.init(
    {
      courseId: DataTypes.INTEGER,
      date: DataTypes.DATE,
      schedule: DataTypes.STRING,
      active: DataTypes.TINYINT,
    },
    {
      sequelize,
      modelName: 'OnCourse',
    },
  );
  return OnCourse;
};
