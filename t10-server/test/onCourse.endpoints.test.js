const request = require('supertest');
const app = require('../src/app');
const messages = require('../src/utils/error.messages');

let token;
let oncourseId;

beforeAll(async () => {
  const response = await request(app)
    .post('/auth/login')
    .send({ email: 'admin@test.com', password: '123456' });
  await request(app)
    .post('/users')
    .set({ Authorization: `Bearer ${response.body.access_token}` })
    .send({
      email: 'usersfs@test.com',
      password: 'test',
      firstName: 'user',
      lastName: 'test',
      roleId: 1,
    });
  const respon = await request(app)
    .post('/auth/login')
    .send({ email: 'usersfs@test.com', password: 'test' });

  const { access_token: accessToken } = respon.body;
  token = accessToken;
});

describe('Response the POST method to onCourse', () => {
  it('should send status 200 and return id', async () => {
    const res = await request(app)
      .post(`/oncourse`)
      .set('Authorization', `Bearer ${token}`)
      .send({ courseId: 1, date: '2021-10-12 03:00:00 ', schedule: 's' });
    oncourseId = res.body.id;
    expect(res.body).toEqual({
      active: expect.any(Number),
      schedule: 's',
      courseId: expect.any(Number),
      createdAt: expect.any(String),
      date: expect.any(String),
      id: expect.any(Number),
      updatedAt: expect.any(String),
    });
    expect(res.statusCode).toBe(201);
  });
  it('should send status 401: No auth token', async () => {
    const res = await request(app)
      .post(`/oncourse`)
      .send({ courseId: 1, date: '2021-10-12 03:00:00', schedule: 's' });
    expect(res.body).toEqual({
      error: 'Unauthorized',
      message: 'No auth token',
      statusCode: 401,
    });
    expect(res.statusCode).toBe(401);
  });
  it('should send status 400: No Course id exist', async () => {
    const res = await request(app)
      .post(`/oncourse`)
      .send({ courseId: 5, date: '2021-10-12 03:00:00', schedule: 's' })
      .set('Authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      error: 'Bad Request',
      message: messages.COURSE_ID,
      statusCode: 400,
    });
    expect(res.statusCode).toBe(400);
  });
  it('should send status 401: invalid date', async () => {
    const res = await request(app)
      .post(`/oncourse`)
      .set('Authorization', `Bearer ${token}`)
      .send({ courseId: 1, date: '2021-10-a', schedule: 's' });
    expect(res.body).toEqual({
      error: 'Bad Request',
      message: 'Invalid Date',
      statusCode: 400,
    });
    expect(res.statusCode).toBe(400);
  });
});

describe('Response the GET method to onCourse', () => {
  it('should send status 200 and return All data', async () => {
    const res = await request(app)
      .get(`/oncourse`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.body).toEqual(expect.any(Array));
    expect(res.statusCode).toBe(200);
  });
  it('should send status 401: No auth token', async () => {
    const res = await request(app).get(`/oncourse`);
    expect(res.body).toEqual({
      error: 'Unauthorized',
      message: 'No auth token',
      statusCode: 401,
    });
    expect(res.statusCode).toBe(401);
  });
});

describe('Response the PUT method to onCourse', () => {
  it('should send status 200 ', async () => {
    const res = await request(app)
      .put(`/oncourse/${1}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ courseId: 1, date: '2021-10-20 03:00:00', schedule: 's' });
    expect(res.body).toEqual({
      active: 1,
      schedule: expect.any(String),
      courseId: expect.any(Number),
      createdAt: expect.any(String),
      date: expect.any(String),
      id: expect.any(Number),
      updatedAt: expect.any(String),
    });
    expect(res.statusCode).toBe(201);
  });
  it('should send status 401: No auth token', async () => {
    const res = await request(app)
      .put(`/oncourse/${oncourseId}`)
      .send({ courseId: 1, date: '2021-10-12 03:00:00', schedule: 's' });
    expect(res.body).toEqual({
      error: 'Unauthorized',
      message: 'No auth token',
      statusCode: 401,
    });
    expect(res.statusCode).toBe(401);
  });
  it('should send status 404: not found param id', async () => {
    const res = await request(app)
      .put(`/oncourse/1000`)
      .send({ courseId: 1, date: '2021-10-12 03:00:00', schedule: 's' })
      .set('Authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      error: 'Not Found',
      message: 'No hay una cursada con esa id',
      statusCode: 404,
    });
    expect(res.statusCode).toBe(404);
  });
  it('should send status 400: No Course id exist', async () => {
    const res = await request(app)
      .put(`/oncourse/${oncourseId}`)
      .send({ courseId: 5, date: '2021-10-12 03:00:00', schedule: 's' })
      .set('Authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      error: 'Bad Request',
      message: messages.COURSE_ID,
      statusCode: 400,
    });
    expect(res.statusCode).toBe(400);
  });
  it('should send status 400: bad request', async () => {
    const res = await request(app)
      .put(`/oncourse/asda`)
      .send({ courseId: 1, date: '2021-10-12 03:00:00', schedule: 's' })
      .set('Authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      error: 'Bad Request',
      message: messages.INVALID_PARAM_ID,
      statusCode: 400,
    });
    expect(res.statusCode).toBe(400);
  });
  it('should send status 401: invalid Date', async () => {
    const res = await request(app)
      .put(`/oncourse/${oncourseId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ courseId: 1, date: '2021-10-a', schedule: 's' });
    expect(res.body).toEqual({
      error: 'Bad Request',
      message: 'Invalid Date',
      statusCode: 400,
    });
    expect(res.statusCode).toBe(400);
  });
  it('should send status 200: Same Data', async () => {
    const res = await request(app)
      .put(`/oncourse/${1}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ courseId: 1, date: '2021-10-12 06:00:00', schedule: 's' });
    expect(res.body).toEqual({
      active: 1,
      schedule: expect.any(String),
      courseId: expect.any(Number),
      createdAt: expect.any(String),
      date: expect.any(String),
      id: expect.any(Number),
      updatedAt: expect.any(String),
    });
    expect(res.statusCode).toBe(201);
  });
});

describe('Response the DELETE method to onCourse', () => {
  it('should send status 201 ', async () => {
    const res = await request(app)
      .delete(`/oncourse/${oncourseId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(204);
  });
  it('should send status 401: No auth token', async () => {
    const res = await request(app).delete(`/oncourse/${oncourseId}`);
    expect(res.body).toEqual({
      error: 'Unauthorized',
      message: 'No auth token',
      statusCode: 401,
    });
    expect(res.statusCode).toBe(401);
  });
  it('should send status 404: not found param id', async () => {
    const res = await request(app)
      .delete(`/oncourse/1000`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      error: 'Not Found',
      message: 'No hay una cursada con esa id',
      statusCode: 404,
    });
    expect(res.statusCode).toBe(404);
  });
  it('should send status 400: bad request', async () => {
    const res = await request(app)
      .delete(`/oncourse/asda`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.body).toEqual({
      error: 'Bad Request',
      message: messages.INVALID_PARAM_ID,
      statusCode: 400,
    });
    expect(res.statusCode).toBe(400);
  });
});

afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});
