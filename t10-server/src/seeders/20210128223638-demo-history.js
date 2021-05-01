const base64 = require('base-64');

const demoHistory = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Histories',
      [
        {
          text: base64.encode(
            'Sociedad de Fomento Federal Del Oeste es el punto de encuentro para los niños, jóvenes, adultos y adultos mayores, en este espacio buscamos acompañarlos, en su desarrollo integral, adquiriendo nuevos conocimientos y herramientas para su crecimiento personal y social.',
          ),
          image:
            'https://ong-test.s3.amazonaws.com/slides/aa378ad7-2cb1-4746-bbdc-d08609d5e9cf',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: base64.encode(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non nisi ut mauris tincidunt fermentum. Vivamus eget aliquet mi. Morbi malesuada odio nisl, quis faucibus arcu convallis at. Suspendisse volutpat, tellus vitae eleifend laoreet, turpis metus vestibulum felis, ac viverra leo sapien et mauris. Fusce sit amet malesuada massa. Quisque posuere massa mauris, sed aliquet erat pellentesque eget. Nulla lacinia ex et consequat aliquam.',
          ),
          image:
            'https://unaleyparalasong.org/wp-content/uploads/2016/04/Logo.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
};

module.exports = demoHistory;
