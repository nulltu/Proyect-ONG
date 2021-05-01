const demoContact = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Contacts',
      [
        {
          title: 'Duda sobre la ong...',
          text: 'Desarrollo de la duda...',
          firstName: 'Fulanito',
          lastName: 'Cosme',
          email: 'mailExample@gmail.com',
          phone: '+54 9 351 NUMERO',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Duda sobre la ong...',
          text: 'Desarrollo de la duda...',
          firstName: 'Sultano',
          lastName: 'Menganito',
          email: 'mailExample@gmail.com',
          phone: '+54 9 351 NUMERO',
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

module.exports = demoContact;
