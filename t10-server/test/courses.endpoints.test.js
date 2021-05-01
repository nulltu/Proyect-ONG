const request = require('supertest');
const app = require('../src/app');
const messages = require('../src/utils/error.messages');
const mocks = require('./mocks/courses.data');
const { courseImage } = require('../src/utils/S3-AWS/defaultImages');

let token;
let userD;
let postId;

beforeAll(async () => {
  const response = await request(app)
    .post('/auth/login')
    .send({ email: 'admin@test.com', password: '123456' });
  await request(app)
    .post('/users')
    .set({ Authorization: `Bearer ${response.body.access_token}` })
    .send({
      email: 'usersft@test.com',
      password: 'test',
      firstName: 'user',
      lastName: 'test',
      roleId: 1,
    });
  const respon = await request(app)
    .post('/auth/login')
    .send({ email: 'usersft@test.com', password: 'test' });

  const { access_token: accessToken, user } = respon.body;
  token = accessToken;
  userD = user;
});

// describe('Response the GET/ method to courses', () => {
//   it('should send status 200 and return courses list', async () => {
//     const res = await request(app)
//       .get('/courses')
//       .set('Authorization', `Bearer ${token}`);
//     expect(res.body).toEqual(
//       expect.arrayContaining([
//         expect.objectContaining({
//           id: expect.any(Number),
//           name: expect.any(String),
//           description: expect.any(String),
//           image: expect.any(String),
//           duration: expect.any(Number),
//           createdAt: expect.any(String),
//           updatedAt: expect.any(String),
//           deleteAt: null,
//         }),
//       ]),
//     );
//     expect(res.statusCode).toBe(200);
//   });
// });

describe('Response the POST/ method to courses', () => {
  it('should send status 201 and return the new course', async () => {
    const res = await request(app)
      .post('/courses')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test',
        description: 'Description test',
        duration: 50,
      });
    postId = res.body.id;
    expect(res.body).toEqual({
      id: expect.any(Number),
      name: 'Test',
      description: 'Description test',
      image: courseImage,
      duration: 50,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
    expect(res.statusCode).toBe(201);
  });

  it('should send status 401', async () => {
    const res = await request(app).post('/courses');
    expect(res.body).toEqual({
      statusCode: 401,
      error: 'Unauthorized',
      message: 'No auth token',
    });
    expect(res.statusCode).toBe(401);
  });

  it('should send status 400 and return a empty name error', async () => {
    const res = await request(app)
      .post('/courses')
      .set('Authorization', `Bearer ${token}`)
      .send(mocks.nameEmpty);
    expect(res.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: messages.COURSE_NAME_EMPTY,
    });
    expect(res.statusCode).toBe(400);
  });

  it('should send status 400 and return a empty description error', async () => {
    const res = await request(app)
      .post('/courses')
      .set('Authorization', `Bearer ${token}`)
      .send(mocks.descriptionEmpty);
    expect(res.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: messages.COURSE_DESCRIPTION_EMPTY,
    });
    expect(res.statusCode).toBe(400);
  });

  it('should send status 400 and return a empty duration error', async () => {
    const res = await request(app)
      .post('/courses')
      .set('Authorization', `Bearer ${token}`)
      .send(mocks.durationEmpty);
    expect(res.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: messages.DURATION_EMPTY,
    });
    expect(res.statusCode).toBe(400);
  });

  it('should send status 400 and return a invalid duration error', async () => {
    const res = await request(app)
      .post('/courses')
      .set('Authorization', `Bearer ${token}`)
      .send(mocks.invalidDuration);
    expect(res.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: messages.INVALID_DURATION,
    });
    expect(res.statusCode).toBe(400);
  });
});

describe('Response the PUT/ method to courses', () => {
  it('should send status 201 and return course edited', async () => {
    const res = await request(app)
      .put(`/courses/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test',
        description: 'Description test',
        duration: 50,
      });
    expect(res.body).toEqual({
      id: expect.any(Number),
      name: 'Test',
      description: 'Description test',
      image: courseImage,
      duration: 50,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
    expect(res.statusCode).toBe(201);
  });

  it('should send status 401', async () => {
    const res = await request(app).put(`/courses/${postId}`);
    expect(res.body).toEqual({
      statusCode: 401,
      error: 'Unauthorized',
      message: 'No auth token',
    });
    expect(res.statusCode).toBe(401);
  });

  it('should send status 400 and return a course id error', async () => {
    const res = await request(app)
      .put(`/courses/${postId + 100}`)
      .set('Authorization', `Bearer ${token}`)
      .send(mocks.validCourse);
    expect(res.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: messages.COURSE_ID,
    });
    expect(res.statusCode).toBe(400);
  });

  it('should send status 400 and return a empty name error', async () => {
    const res = await request(app)
      .put(`/courses/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(mocks.nameEmpty);
    expect(res.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: messages.COURSE_NAME_EMPTY,
    });
    expect(res.statusCode).toBe(400);
  });

  it('should send status 400 and return a empty description error', async () => {
    const res = await request(app)
      .put(`/courses/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(mocks.descriptionEmpty);
    expect(res.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: messages.COURSE_DESCRIPTION_EMPTY,
    });
    expect(res.statusCode).toBe(400);
  });

  it('should send status 400 and return a empty duration error', async () => {
    const res = await request(app)
      .put(`/courses/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(mocks.durationEmpty);
    expect(res.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: messages.DURATION_EMPTY,
    });
    expect(res.statusCode).toBe(400);
  });

  it('should send status 400 and return a invalid duration error', async () => {
    const res = await request(app)
      .put(`/courses/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(mocks.invalidDuration);
    expect(res.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: messages.INVALID_DURATION,
    });
    expect(res.statusCode).toBe(400);
  });

  it('should send status 400 and return a invalid param id error', async () => {
    const res = await request(app)
      .put('/courses/asdf')
      .set('Authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: messages.INVALID_PARAM_ID,
    });
    expect(res.statusCode).toBe(400);
  });
});

describe('Response the DELETE/ method to courses', () => {
  it('should send status 401', async () => {
    const res = await request(app).delete(`/courses/${postId}`);
    expect(res.body).toEqual({
      statusCode: 401,
      error: 'Unauthorized',
      message: 'No auth token',
    });
    expect(res.statusCode).toBe(401);
  });

  it('should send status 400 and return a invalid param id error', async () => {
    const res = await request(app)
      .delete('/courses/asdf')
      .set('Authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: messages.INVALID_PARAM_ID,
    });
    expect(res.statusCode).toBe(400);
  });

  it('should send status 400 and return a course id error', async () => {
    const res = await request(app)
      .delete('/courses/10000')
      .set('Authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: messages.COURSE_ID,
    });
    expect(res.statusCode).toBe(400);
  });

  it('should send status 204 and delete de course', async () => {
    const res = await request(app)
      .delete(`/courses/${postId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(204);
  });

  it('should send status 404, because the course was deleted', async () => {
    const res = await request(app)
      .get(`/courses/${postId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: messages.COURSE_ID,
    });
    expect(res.statusCode).toBe(400);
  });
});

afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  await request(app)
    .delete(`/users/${userD.id}`)
    .set('Authorization', `Bearer ${token}`);
});
