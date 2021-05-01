module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'EntriesTypes',
      [
        {
          type: 'actividades',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'novedades',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
};
