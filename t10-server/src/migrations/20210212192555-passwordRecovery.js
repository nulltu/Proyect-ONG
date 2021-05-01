module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PasswordRecoveries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'usersId',
        },
      },
      token: {
        type: Sequelize.STRING,
      },
      expireToken: {
        type: Sequelize.BIGINT,
      },
      state: {
        type: Sequelize.TINYINT,
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
    await queryInterface.dropTable('PasswordRecoveries');
  },
};
