const request = require('supertest');
const app = require('../src/app');
const messages = require('../src/utils/error.messages');

describe('Response the POST/ method to contact', () => {
  it('should send status 400 and return empty name error', async () => {
    const res = await request(app).post('/contact').send({
      name: '',
      email: 'testmail@gmail.com',
      question: 'Test question',
    });
    expect(res.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: messages.NAME_EMPTY,
    });
    expect(res.statusCode).toBe(400);
  });

  it('should send status 400 and return empty email error', async () => {
    const res = await request(app).post('/contact').send({
      name: 'Test name',
      email: '',
      question: 'Test question',
    });
    expect(res.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: messages.EMAIL_EMPTY,
    });
    expect(res.statusCode).toBe(400);
  });

  it('should send status 400 and return invalid email error', async () => {
    const res = await request(app).post('/contact').send({
      name: 'Test name',
      email: 'testmailgmail.com',
      question: 'Test question',
    });
    expect(res.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: messages.EMAIL_INVALID,
    });
    expect(res.statusCode).toBe(400);
  });

  it('should send status 400 and return empty question error', async () => {
    const res = await request(app).post('/contact').send({
      name: 'Test name',
      email: 'testmail@gmail.com',
      question: '',
    });
    expect(res.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: messages.QUESTION_EMPTY,
    });
    expect(res.statusCode).toBe(400);
  });
});

afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});
