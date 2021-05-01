const mocks = {
  validCourse: {
    name: 'Test',
    description: 'Description test',
    image: 'image.jpg',
    duration: 50,
  },
  nameEmpty: {
    name: '',
    description: 'Description test',
    image: 'image.jpg',
    duration: 50,
  },
  descriptionEmpty: {
    name: 'Prueba',
    description: '',
    image: 'image.jpg',
    duration: 50,
  },
  imageEmpty: {
    name: 'Prueba',
    description: 'Description test',
    image: '',
    duration: 50,
  },
  durationEmpty: {
    name: 'Prueba',
    description: 'Description test',
    image: 'image.jpg',
    duration: '',
  },
  invalidDuration: {
    name: 'Prueba',
    description: 'Description test',
    image: 'image.jpg',
    duration: 'invalid duration',
  },
};

module.exports = mocks;
