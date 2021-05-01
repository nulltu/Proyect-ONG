const createDemoSlide = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Slides',
      [
        {
          image:
            'https://ong-test.s3.sa-east-1.amazonaws.com/slides/891aac7c-c697-4e95-9d5c-420abe25d5c3',
          organizationId: 1,
          description: 'Community Manager',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          image:
            'https://ong-test.s3.amazonaws.com/slides/2f23a26a-60bf-4e2a-8878-d1c536510502',
          organizationId: 1,
          description: 'Habilidades Socioemocionales',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          image:
            'https://ong-test.s3.sa-east-1.amazonaws.com/slides/5a955ed6-3697-4af1-a7f2-8177446350cb',
          organizationId: 1,
          description: 'Escuela de youtubers',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          image:
            'https://ong-test.s3.sa-east-1.amazonaws.com/slides/353c8302-67d5-4dc5-9af3-11923ea5cad5',
          organizationId: 1,
          description: 'Barberia',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          image:
            'https://ong-test.s3.sa-east-1.amazonaws.com/slides/6aaec91e-d22c-404c-b07b-e84468376750',
          organizationId: 1,
          description: 'Folklore',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          image:
            'https://ong-test.s3.sa-east-1.amazonaws.com/slides/45e2f10d-dece-4985-8216-ee5ceddd2197',
          organizationId: 1,
          description: 'Entrega de viandas',
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

module.exports = createDemoSlide;
