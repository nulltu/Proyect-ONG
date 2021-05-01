const request = require('supertest');
const app = require('../src/app');
const messages = require('../src/utils/error.messages');

let token;
let orgID;

beforeAll(async () => {
  const response = await request(app)
    .post('/auth/login')
    .send({ email: 'admin@test.com', password: '123456' });
  const { access_token: accessToken } = response.body;
  token = accessToken;

  const res1 = await request(app)
    .post('/organization')
    .set({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    })
    .send({
      name: 'Nuevo Nombre',
      image: 'Nueva Url path',
      description: 'Nueva Descripcion',
      phone: '+54 9 351 NUMERO',
      address: 'Nueva Direccion',
      welcomeText: 'Nuevo Texto de Bienvenida',
      instaUrl: 'Nuevo Instagram url path',
      facebookUrl: 'Nuevo Facebook url path',
      twitterUrl: 'Nuevo Twitter url path',
    });
  orgID = res1.body.body.id;
});

describe('Test the post Organization route', () => {
  it('Should receive "201" status code', async () => {
    const res = await request(app)
      .post('/organization')
      .set({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Nuevo Nombre',
        image: 'Nueva Url path',
        description: 'Nueva Descripcion',
        phone: '+54 9 351 NUMERO',
        address: 'Nueva Direccion',
        welcomeText: 'Nuevo Texto de Bienvenida',
        instaUrl: 'Nuevo Instagram url path',
        facebookUrl: 'Nuevo Facebook url path',
        twitterUrl: 'Nuevo Twitter url path',
      });
    expect(res.status).toBe(201);
  });

  it('Should receive status 401: No auth token', async () => {
    const res = await request(app)
      .post('/organization')
      .set({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: null,
      })
      .send({
        name: 'Nuevo Nombre',
        image: 'Nueva Url path',
        description: 'Nueva Descripcion',
        phone: '+54 9 351 NUMERO',
        address: 'Nueva Direccion',
        welcomeText: 'Nuevo Texto de Bienvenida',
        instaUrl: 'Nuevo Instagram url path',
        facebookUrl: 'Nuevo Facebook url path',
        twitterUrl: 'Nuevo Twitter url path',
      });
    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      error: 'Unauthorized',
      message: 'No auth token',
      statusCode: 401,
    });
  });

  it('Should receive status 400: Address empty', async () => {
    const res = await request(app)
      .post('/organization')
      .set({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Nuevo Nombre',
        image: 'Nueva Url path',
        description: 'Nueva Descripcion',
        phone: '+54 9 351 NUMERO',
        address: '',
        welcomeText: 'Nuevo Texto de Bienvenida',
        instaUrl: 'Nuevo Instagram url path',
        facebookUrl: 'Nuevo Facebook url path',
        twitterUrl: 'Nuevo Twitter url path',
      });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: 'Bad Request',
      message: messages.ADDRESS_EMPTY,
      statusCode: 400,
    });
  });
});

describe('Test the update/:id Organization route', () => {
  it('Should receive status 201', async (done) => {
    request(app)
      .put(`/organization/${orgID}`)
      .set({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Updated Nombre',
        image: 'Updated Url path',
        description: 'Updated Descripcion',
        phone: '+54 9 351 NUMERO',
        address: 'Updated Address',
        welcomeText: 'Updated Texto de Bienvenida',
        instaUrl: 'Updated Instagram url path',
        facebookUrl: 'Updated Facebook url path',
        twitterUrl: 'Updated Twitter url path',
      })
      .expect(201)
      .end(done);
  });

  it('Should receive status 401: No auth token', async () => {
    const res = await request(app)
      .put(`/organization/${orgID}`)
      .set({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: null,
      })
      .send({
        name: 'Updated Nombre',
        image: 'Updated Url path',
        description: 'Updated Descripcion',
        phone: '+54 9 351 NUMERO',
        address: 'Updated Address',
        welcomeText: 'Updated Texto de Bienvenida',
        instaUrl: 'Updated Instagram url path',
        facebookUrl: 'Updated Facebook url path',
        twitterUrl: 'Updated Twitter url path',
      });
    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      error: 'Unauthorized',
      message: 'No auth token',
      statusCode: 401,
    });
  });

  it('Should receive status 400: Bad Request', async () => {
    const res = await request(app)
      .put(`/organization/si1w4s`)
      .set({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Updated Nombre',
        image: 'Updated Url path',
        description: 'Updated Descripcion',
        phone: '+54 9 351 NUMERO',
        address: 'Updated Address',
        welcomeText: 'Updated Texto de Bienvenida',
        instaUrl: 'Updated Instagram url path',
        facebookUrl: 'Updated Facebook url path',
        twitterUrl: 'Updated Twitter url path',
      });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: 'Bad Request',
      message: messages.INVALID_PARAM_ID,
      statusCode: 400,
    });
  });

  it('Should receive 404: Not Found', async () => {
    const idValue = 145798;
    const res = await request(app)
      .put(`/organization/${idValue}`)
      .set({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Updated Nombre',
        image: 'Updated Url path',
        description: 'Updated Descripcion',
        phone: '+54 9 351 NUMERO',
        address: 'Updated Address',
        welcomeText: 'Updated Texto de Bienvenida',
        instaUrl: 'Updated Instagram url path',
        facebookUrl: 'Updated Facebook url path',
        twitterUrl: 'Updated Twitter url path',
      });
    expect(res.status).toBe(404);
  });
});

describe('Test the delete/:id Organization route', () => {
  it('Should receive status 201', async () => {
    const res = await request(app)
      .delete(`/organization/${orgID}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(res.status).toBe(201);
  });

  it('Should receive status 401: Not auth token', async () => {
    const res = await request(app)
      .delete(`/organization/${orgID}`)
      .set({ Authorization: null });
    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      error: 'Unauthorized',
      message: 'No auth token',
      statusCode: 401,
    });
  });

  it('Should receive status 400: Bad Request', async () => {
    const res = await request(app)
      .delete(`/organization/si1w4s`)
      .set({ Authorization: `Bearer ${token}` });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: 'Bad Request',
      message: messages.INVALID_PARAM_ID,
      statusCode: 400,
    });
  });

  it('Should receive status 404: Not Found', async () => {
    const idValue = 416874;
    const res = await request(app)
      .delete(`/organization/${idValue}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(res.status).toBe(404);
  });
});

afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});
