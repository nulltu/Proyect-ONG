export const initialState = {
  organization: {
    dataOrganization: [
      {
        id: 1,
        name: 'Ong de prueba',
        image:
          'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        description: 'Descripción de organización de prueba 1',
        email: '166hahsu@gmail.com',
        phone: '+54 9 351 NUMERO',
        address: 'Calle siempre viva',
        welcomeText: 'Bienvenido a organización demo',
        instaUrl: 'Instagram URL',
        facebookUrl: 'Facebook URL',
        twitterUrl: 'Twitter URL',
        deletedAt: null,
        createdAt: '2021-01-23T19:05:07.000Z',
        updatedAt: '2021-01-23T19:05:07.000Z',
      },
    ],
  },
  slides: {
    dataSlides: [
      {
        image:
          'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        organizationId: 1,
        description: 'slider de prueba',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
};

export const aboutUsInitialState = {
  organization: {
    dataOrganization: [
      {
        id: 1,
        name: 'Ong de prueba',
        image:
          'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        description: 'Descripción de organización de prueba 1',
        email: '166hahsu@gmail.com',
        phone: '+54 9 351 NUMERO',
        address: 'Calle siempre viva',
        welcomeText: 'Bienvenido a organización demo',
        instaUrl: 'Instagram URL',
        facebookUrl: 'Facebook URL',
        twitterUrl: 'Twitter URL',
        deletedAt: null,
        createdAt: '2021-01-23T19:05:07.000Z',
        updatedAt: '2021-01-23T19:05:07.000Z',
      },
    ],
  },
  history: {
    dataHistory: [
      {
        text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non nisi ut mauris tincidunt fermentum. Vivamus eget aliquet mi. Morbi malesuada odio nisl, quis faucibus arcu convallis at. Suspendisse volutpat, tellus vitae eleifend laoreet, turpis metus vestibulum felis, ac viverra leo sapien et mauris. Fusce sit amet malesuada massa. Quisque posuere massa mauris, sed aliquet erat pellentesque eget. Nulla lacinia ex et consequat aliquam.',
        image: 'www.imagen.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text:
          'Maecenas dapibus, nibh ut rhoncus lacinia, diam turpis finibus dui, a ultrices turpis arcu vulputate orci. Nullam vel mi porta, bibendum nisl ut, sagittis sapien. Vivamus ornare non est vitae scelerisque. Phasellus sit amet fermentum lorem. Vestibulum congue nibh molestie nisi cursus convallis vel et nulla. Vivamus vestibulum diam nunc, et ultrices magna mollis nec. Donec a dolor luctus, viverra enim tincidunt, facilisis ante.',
        image: 'www.imagen.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
};

export const initialStateLogged = {
  user: {
    accessToken: '',
    roleUser: '',
    listUsers: '',
    isUserlogged: true,
  },
  slides: {
    dataSlides: [
      {
        image:
          'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        organizationId: 1,
        description: 'slider de prueba',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  organization: {
    dataOrganization: [
      {
        id: 1,
        name: 'Ong de prueba',
        image:
          'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        description: 'Descripción de organización de prueba 1',
        email: '166hahsu@gmail.com',
        phone: '+54 9 351 NUMERO',
        address: 'Calle siempre viva',
        welcomeText: 'Bienvenido a organización demo',
        instaUrl: 'Instagram URL',
        facebookUrl: 'Facebook URL',
        twitterUrl: 'Twitter URL',
        deletedAt: null,
        createdAt: '2021-01-23T19:05:07.000Z',
        updatedAt: '2021-01-23T19:05:07.000Z',
      },
    ],
  },
};

export const loginOnly = {
  user: {
    accessToken: '',
    roleUser: '',
    listUsers: '',
    isUserlogged: true,
  },
};

export const initialStateUser = {
  user: {
    id: 0,
    accessToken: '',
    roleUser: '',
    listUsers: '',
    isUserlogged: true,
    refreshToken: '',
    userData: {
      id: 0,
      firstName: 'usuario',
      lastName: 'test',
      email: 'user@test.com',
      image: 'image.jpg',
    },
  },
};

export const noData = '';
