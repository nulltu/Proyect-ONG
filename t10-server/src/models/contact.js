/* eslint-disable no-unused-vars */

const { Model } = require('sequelize');

const contact = (sequelize, DataTypes) => {
  class Contact extends Model {
    static associate(models) {}
  }
  Contact.init(
    {
      title: DataTypes.STRING,
      text: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Contact',
    },
  );
  return Contact;
};

module.exports = contact;
