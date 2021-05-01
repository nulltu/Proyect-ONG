const ACTIVE = 1;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'OnCourses',
      [
        {
          courseId: 1,
          date: new Date(),
          active: ACTIVE,
          schedule: '20:00-21:00',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
};
