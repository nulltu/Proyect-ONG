module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Inscriptions',
      [
        {
          userId: 1,
          onCourseId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
};
