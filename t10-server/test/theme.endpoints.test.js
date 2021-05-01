const request = require('supertest');
const app = require('../src/app');
const messages = require('../src/utils/error.messages');

let token;

beforeAll(async () => {
  const response = await request(app)
    .post('/auth/login')
    .send({ email: 'admin@test.com', password: '123456' });
  const { access_token: accessToken } = response.body;
  token = accessToken;
});

describe('Response the GET method to theme', () => {
  it('should send status 200 and return theme', async () => {
    const res = await request(app)
      .get('/theme')
      .set('Authorization', `Bearer ${token}`);
    expect(res.body).toEqual([
      {
        name: 'Default',
        backgroundColor: '#ffffff',
        borderColor: '#e1e4e8',
        tableColor: '#fafbfc',
        headerColor: '#ffffff',
        primaryColor: '#ffffff',
        lettersColor: '#000000',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        id: 1,
      },
      {
        name: 'Dark',
        backgroundColor: '#0d1117',
        borderColor: '#30363d',
        tableColor: '#21262d',
        headerColor: '#161b22',
        primaryColor: '#30363d',
        lettersColor: '#ffffff',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        id: 2,
      },
    ]);
    expect(res.statusCode).toBe(200);
  });

  describe('Response the PUT/: method to theme', () => {
    it('should send status 200 and return theme new data', async () => {
      const res = await request(app)
        .put(`/theme/1`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Blue',
          primaryColor: '#000000',
          lettersColor: '#484848',
          backgroundColor: '#121212',
        });
      expect(res.body).toEqual({
        name: 'Blue',
        primaryColor: '#000000',
        lettersColor: '#484848',
        backgroundColor: '#121212',
      });
      expect(res.statusCode).toBe(200);
    });
    it('should send status 401: No auth token', async () => {
      const res = await request(app).put(`/theme/1`);
      expect(res.body).toEqual({
        error: 'Unauthorized',
        message: 'No auth token',
        statusCode: 401,
      });
      expect(res.statusCode).toBe(401);
    });
    it('should send status 400: theme name already exist', async () => {
      const res = await request(app)
        .put(`/theme/2`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Blue',
          primaryColor: '#000000',
          lettersColor: '#484848',
          backgroundColor: '#121212',
        });
      expect(res.body).toEqual({
        error: 'Bad Request',
        message: 'Ya esta registrado un tema con ese nombre',
        statusCode: 400,
      });
      expect(res.statusCode).toBe(400);
    });
    it('should send status 400 : name empty', async () => {
      const res = await request(app)
        .put(`/theme/1`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: '',
          primaryColor: '#000000',
          lettersColor: '#484848',
          backgroundColor: '#121212',
        });
      expect(res.body).toEqual({
        error: 'Bad Request',
        message: 'El tema debe de tener un nombre',
        statusCode: 400,
      });
      expect(res.statusCode).toBe(400);
    });
    it('should send status 400: colors empty', async () => {
      const res = await request(app)
        .put(`/theme/1`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Blue',
          primaryColor: '',
          lettersColor: '#484848',
          backgroundColor: '#121212',
        });
      expect(res.body).toEqual({
        error: 'Bad Request',
        message: messages.COLOR_EMPTY,
        statusCode: 400,
      });
      expect(res.statusCode).toBe(400);
    });
  });

  describe('Response the POST/: method to theme', () => {
    it('should send status 201 and return theme new data', async () => {
      const res = await request(app)
        .post(`/theme`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'green',
          primaryColor: '#000000',
          lettersColor: '#484848',
          backgroundColor: '#121212',
        });
      expect(res.body).toEqual({
        name: 'green',
        primaryColor: '#000000',
        lettersColor: '#484848',
        backgroundColor: '#121212',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        id: 3,
      });
      expect(res.statusCode).toBe(201);
    });
    it('should send status 401: No auth token', async () => {
      const res = await request(app).post(`/theme`);
      expect(res.body).toEqual({
        error: 'Unauthorized',
        message: 'No auth token',
        statusCode: 401,
      });
      expect(res.statusCode).toBe(401);
    });
    it('should send status 400: theme name already exist', async () => {
      const res = await request(app)
        .post(`/theme`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'green',
          primaryColor: '#000000',
          lettersColor: '#484848',
          backgroundColor: '#121212',
        });
      expect(res.body).toEqual({
        error: 'Bad Request',
        message: 'Ya esta registrado un tema con ese nombre',
        statusCode: 400,
      });
      expect(res.statusCode).toBe(400);
    });
    it('should send status 400 : name empty', async () => {
      const res = await request(app)
        .post(`/theme`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: '',
          primaryColor: '#000000',
          lettersColor: '#484848',
          backgroundColor: '#121212',
        });
      expect(res.body).toEqual({
        error: 'Bad Request',
        message: 'El tema debe de tener un nombre',
        statusCode: 400,
      });
      expect(res.statusCode).toBe(400);
    });
    it('should send status 400: colors empty', async () => {
      const res = await request(app)
        .post(`/theme`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Blue',
          primaryColor: '',
          lettersColor: '#484848',
          backgroundColor: '#121212',
        });
      expect(res.body).toEqual({
        error: 'Bad Request',
        message: messages.COLOR_EMPTY,
        statusCode: 400,
      });
      expect(res.statusCode).toBe(400);
    });
  });
  describe('Response the DELETE/:id method to theme', () => {
    it('should send status 401: No auth token', async () => {
      const res = await request(app).delete(`/theme/1`);
      expect(res.body).toEqual({
        error: 'Unauthorized',
        message: 'No auth token',
        statusCode: 401,
      });
      expect(res.statusCode).toBe(401);
    });
    it('should send status 404: Not Found param id', async () => {
      const res = await request(app)
        .delete(`/theme/1000`)
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
        .delete(`/theme/1`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(204);
    });
  });
});

afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});
