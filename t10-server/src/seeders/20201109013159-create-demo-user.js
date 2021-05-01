const bcrypt = require('bcrypt');
const { userImage } = require('../utils/S3-AWS/defaultImages');

const createDemoUser = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    const pass = '123456';
    const salt = await bcrypt.genSalt(10);
    const encryptPass = await bcrypt.hash(pass, salt);

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Administrador',
          lastName: 'Admin',
          email: 'admin@test.com',
          password: encryptPass,
          roleId: 1,
          emailVerified: true,
          organizationId: 1,
          image: userImage,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Usuario',
          lastName: 'Comun',
          email: 'default@test.com',
          password: encryptPass,
          roleId: 2,
          organizationId: 1,
          emailVerified: true,
          image: userImage,
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

module.exports = createDemoUser;
