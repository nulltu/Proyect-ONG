const request = require('supertest');
const app = require('../src/app');
const mocks = require('./mocks/user.data');
const { userImage } = require('../src/utils/S3-AWS/defaultImages');
const messages = require('../src/utils/error.messages');

let userData;
let token;

describe('Response the POST method to register', () => {
  it('should send status 400 : Email empty', async () => {
    const res = await request(app)
      .post('/auth/register/')
      .send(mocks.emailEmpty);
    expect(res.body).toEqual({
      error: 'Bad Request',
      message: messages.EMAIL_EMPTY,
      statusCode: 400,
    });
    expect(res.statusCode).toBe(400);
  });
  it('should send status 400: Invalid email', async () => {
    const res = await request(app)
      .post('/auth/register/')
      .send(mocks.emailInvalid);
    expect(res.body).toEqual({
      error: 'Bad Request',
      message: messages.EMAIL_INVALID,
      statusCode: 400,
    });
    expect(res.statusCode).toBe(400);
  });
  it('should send status 400: Password empty', async () => {
    const res = await request(app)
      .post('/auth/register/')
      .send(mocks.passwordEmpty);
    expect(res.body).toEqual({
      error: 'Bad Request',
      message: messages.PASSWORD_EMPTY,
      statusCode: 400,
    });
  });
  it('should send status 400: FirstName empty', async () => {
    const res = await request(app)
      .post('/auth/register/')
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
      .post('/auth/register/')
      .send(mocks.lastNameEmpty);
    expect(res.body).toEqual({
      error: 'Bad Request',
      message: messages.LASTNAME_EMPTY,
      statusCode: 400,
    });
    expect(res.statusCode).toBe(400);
  });
  it('should send status 400: User already exist', async () => {
    const res = await request(app)
      .post('/auth/register/')
      .send(mocks.userAlreadyExist);
    expect(res.body).toEqual({
      error: 'Bad Request',
      message: messages.USER_ALREADY_EXIST,
      statusCode: 400,
    });
    expect(res.statusCode).toBe(400);
  });
});

describe('Response the POST method to login', () => {
  it('should send status 200, return token and user data', async () => {
    const res = await request(app).post('/auth/login/').send({
      email: 'default@test.com',
      password: '123456',
    });
    const { access_token: accessToken, user } = res.body;
    token = accessToken;
    userData = user;
    expect(res.body).toEqual({
      access_token: expect.any(String),
      token_type: 'Bearer',
      expires_in: expect.any(String),
      refresh_token: expect.any(String),
      user: {
        id: expect.any(Number),
        firstName: 'Usuario',
        lastName: 'Comun',
        email: 'default@test.com',
        image: userImage,
        emailVerified: true,
        roleId: expect.any(Number),
        organizationId: expect.any(Number),
      },
    });
    expect(res.statusCode).toBe(200);
  });
  it('should send status 400 : Email empty', async () => {
    const res = await request(app).post('/auth/login/').send(mocks.emailEmpty);
    expect(res.body).toEqual({
      error: 'Bad Request',
      message: messages.EMAIL_EMPTY,
      statusCode: 400,
    });
    expect(res.statusCode).toBe(400);
  });
  it('should send status 400: Invalid email', async () => {
    const res = await request(app)
      .post('/auth/login/')
      .send(mocks.emailInvalid);
    expect(res.body).toEqual({
      error: 'Bad Request',
      message: messages.EMAIL_INVALID,
      statusCode: 400,
    });
    expect(res.statusCode).toBe(400);
  });
  it('should send status 400: Password empty', async () => {
    const res = await request(app)
      .post('/auth/login/')
      .send(mocks.passwordEmpty);
    expect(res.body).toEqual({
      error: 'Bad Request',
      message: messages.PASSWORD_EMPTY,
      statusCode: 400,
    });
    expect(res.statusCode).toBe(400);
  });
});

afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  await request(app)
    .delete(`/users/${userData.id}`)
    .set('Authorization', `Bearer ${token}`);
});
