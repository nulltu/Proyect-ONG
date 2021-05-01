const request = require('supertest');
const app = require('../src/app');
const mocks = require('./mocks/user.data');
const { userImage } = require('../src/utils/S3-AWS/defaultImages');
const messages = require('../src/utils/error.messages');

let token;
let userD;

beforeAll(async () => {
  const response = await request(app)
    .post('/auth/login')
    .send({ email: 'admin@test.com', password: '123456' });
  await request(app)
    .post('/users')
    .set({ Authorization: `Bearer ${response.body.access_token}` })
    .send({
      email: 'users@test.com',
      password: 'test',
      firstName: 'user',
      lastName: 'test',
      roleId: 1,
    });
  const respon = await request(app)
    .post('/auth/login')
    .send({ email: 'users@test.com', password: 'test' });

  const { access_token: accessToken, user } = respon.body;
  token = accessToken;
  userD = user;
});

describe('Response the GET/:id method to user', () => {
  it('should send status 200 and return user data', async () => {
    const res = await request(app)
      .get(`/users/${userD.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      id: expect.any(Number),
      firstName: 'user',
      lastName: 'test',
      email: 'users@test.com',
      image: userImage,
      emailVerified: true,
      roleId: expect.any(Number),
      organizationId: expect.any(Number),
    });
    expect(res.statusCode).toBe(200);
  });
  it('should send status 401: No auth token', async () => {
    const res = await request(app).get(`/users/${userD.id}`);
    expect(res.body).toEqual({
      error: 'Unauthorized',
      message: 'No auth token',
      statusCode: 401,
    });
    expect(res.statusCode).toBe(401);
  });
  it('should send status 404: id cannot be found', async () => {
    const res = await request(app)
      .get(`/users/1000`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      error: 'Not Found',
      message: messages.ID_NOT_FOUND,
      statusCode: 404,
    });
    expect(res.statusCode).toBe(404);
  });
});

describe('Response the PUT/: method to user', () => {
  it('should send status 200 and return user new data', async () => {
    const res = await request(app)
      .put(`/users`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'usuario',
        lastName: 'testeo',
      });
    expect(res.body).toEqual({
      firstName: 'usuario',
      lastName: 'testeo',
    });
    expect(res.statusCode).toBe(200);
  });
  it('should send status 401: No auth token', async () => {
    const res = await request(app).put(`/users/${userD.id}`);
    expect(res.body).toEqual({
      error: 'Unauthorized',
      message: 'No auth token',
      statusCode: 401,
    });
    expect(res.statusCode).toBe(401);
  });
  it('should send status 400: FirstName empty', async () => {
    const res = await request(app)
      .put(`/users/${userD.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(mocks.firstNameEmpty);
    expect(res.body).toEqual({
      error: 'Bad Request',
      message: messages.FIRSTNAME_EMPTY,
      statusCode: 400,
    });
    expect(res.statusCode).toBe(400);
  });
  it('should send status 400: LastName empty', async () => {
    const res = await request(app)
      .put(`/users/${userD.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(mocks.lastNameEmpty);
    expect(res.body).toEqual({
      error: 'Bad Request',
      message: messages.LASTNAME_EMPTY,
      statusCode: 400,
    });
    expect(res.statusCode).toBe(400);
  });
});

describe('Response the DELETE/:id method to user', () => {
  it('should send status 401: No auth token', async () => {
    const res = await request(app).delete(`/users/${userD.id}`);
    expect(res.body).toEqual({
      error: 'Unauthorized',
      message: 'No auth token',
      statusCode: 401,
    });
    expect(res.statusCode).toBe(401);
  });
  it('should send status 404: Not Found param id', async () => {
    const res = await request(app)
      .delete(`/users/1000`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      error: 'Not Found',
      message: messages.ID_NOT_FOUND,
      statusCode: 404,
    });
    expect(res.statusCode).toBe(404);
  });
  it('should send status 200 and return user data', async () => {
    const res = await request(app)
      .delete(`/users/${userD.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(204);
  });
});

afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});
