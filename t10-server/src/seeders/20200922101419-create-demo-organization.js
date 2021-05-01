const { organizationImage } = require('../utils/S3-AWS/defaultImages');

const createDemoOrganization = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Organizations',
      [
        {
          name: 'SFFO',
          image: organizationImage,
          description: 'Descripción de organización de prueba 1',
          email: 'sf.federaldeloeste@gmail.com',
          phone: '011 2198-3569 / 1558789244',
          address: 'Rawson 1123 (Haedo Norte - Morón)',
          welcomeText: 'Bienvenido a SFFO',
          instaUrl: 'Instagram URL',
          facebookUrl:
            'https://www.facebook.com/Sociedad-de-fomento-federal-del-oeste-433828953492733/',
          twitterUrl: 'Twitter URL',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface) => {},
};

module.exports = createDemoOrganization;
