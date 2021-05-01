const createRole = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Roles',
      [
        {
          name: 'Administrador',
          description: 'Usuario administrador',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Estándar',
          description: 'Usuario regular',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Socio',
          description: 'Usuario socio',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {},
};

module.exports = createRole;
