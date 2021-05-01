const { Model } = require('sequelize');

const course = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.hasMany(models.OnCourse, { foreignKey: 'courseId' });
    }
  }
  Course.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      duration: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Courses',
    },
  );
  return Course;
};

module.exports = course;
