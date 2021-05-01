const base64 = require('base-64');

const createDemoEntry = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Entries',
      [
        {
          title: 'Curso de Lenguaje de Señas y Braille',
          content: base64.encode(
            'Seguimos trabajando por la verdadera inclusión, Curso de Lenguaje de Señas y Braille.\nInicia el Lunes 15 de Febrero a las 11 hs NO TE LO PIERDAS',
          ),
          image:
            'https://ong-test.s3.amazonaws.com/slides/9868d420-348d-4ae9-8867-3487d224c3f1',
          typeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Asesoramiento Legal Gratuito',
          content: base64.encode(
            'Asesoramiento Legal Gratuito para los vecinos.\nSolicitar turnos al los Tel 2198-3569 Cel 15-5878-9244.\nATENCION LOS DÍAS MIÉRCOLES 18 hs CON TURNO PREVIO.',
          ),
          image:
            'https://ong-test.s3.sa-east-1.amazonaws.com/slides/9dbaa459-3008-4c9a-9dc8-91027e66d0db',
          typeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Iniciación a la Informática',
          content: base64.encode(
            'Curso Iniciación a la Informática\n8 encuentros (2 meses) de 2:00 Hs los días Lunes de 15:30 a 17:00 Hs\ncomienza el Lunes 08/03, donde aprenderás Word Básico, Introducción al internet, Creación de Correo Electrónico, Uso de Zoom o Google Meet y mucho más..!!\nInscribite ya!!!\nRespetando todos los protocolos hasta un máximo de 10 personas,\nno te quedes afuera, recordar traer tapaboca',
          ),
          image:
            'https://ong-test.s3.sa-east-1.amazonaws.com/slides/c92e8400-d58f-4c81-8188-5cf34cdf580c',
          typeId: 2,
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

module.exports = createDemoEntry;
