const createDemoCourse = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Courses',
      [
        {
          name: 'Curso Armado y Reparación de PC',
          description:
            '8 encuentros (2 meses)  de 2:00 Hs los días viernes de 16:00 a 18:00 Hs comienza el viernes 22 , donde aprenderás el armado pieza por pieza Inscribite ya!!!',
          image:
            'http://rapitronic.com/wp-content/uploads/2020/02/tecnico-pc-2-1024x683.jpg',
          duration: 46,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Curso de Uñas Esculpidas',
          description:
            '12 encuentros (3 Meses) de 2:00Hs los días Sábados de 16:00 a 18:00 Hs Comienza el día Sábado 20/02, donde aprenderás Uñas Esculpidas, Esmaltados y Diseño a Mano Alzada, Inscribite ya!!! ',
          image:
            'https://media.elpatagonico.com/p/bbdac4c8eaeb05d51ffeda7e59fb2eb6/adjuntos/193/imagenes/036/950/0036950702/esculpidasjpg.jpg',
          duration: 46,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Curso Gratuito de Youtubers',
          description:
            'Aprenden Jugando diseño y edición de Video, Audio, efectos, armado y desarrollo de proyectos, pero sobre todo comparti buenos momentos junto a otros niñ@s/adolescentes de forma Online',
          image:
            'https://www.thestreet.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cg_faces:center%2Cq_auto:good%2Cw_768/MTY3NTQxNTU3NTcwNTEyNzgy/how-much-do-youtubers-make-revenue-streams-and-top-performers.png',
          duration: 46,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Curso Social Inicial de Panadería Dulce ',
          description:
            'El día 19 de Diciembre a las 10:00 hs a 13:00 hs Aprende a hacer tus propias Facturas dulces, Medialunas de Grasa, Manteca, Rellenas, Vigilantes, Tortita Negra, Pepas, Etc, genera así tu propio emprendimiento e ingreso. ',
          image:
            'https://www.guiajaco.com.ar/wp-content/uploads/2020/06/dulce-tentacion_portada.jpg',
          duration: 46,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
};

module.exports = createDemoCourse;
