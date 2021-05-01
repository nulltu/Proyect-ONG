const Theme = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Themes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      backgroundColor: {
        type: Sequelize.STRING,
      },
      tableColor: {
        type: Sequelize.STRING,
      },
      borderColor: {
        type: Sequelize.STRING,
      },
      headerColor: {
        type: Sequelize.STRING,
      },
      primaryColor: {
        type: Sequelize.STRING,
      },
      lettersColor: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Themes');
  },
};

module.exports = Theme;
