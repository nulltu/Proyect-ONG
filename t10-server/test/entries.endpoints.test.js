const request = require('supertest');
const app = require('../src/app');
const messages = require('../src/utils/error.messages');

let token;

beforeAll(async () => {
  const response = await request(app)
    .post('/auth/login')
    .send({ email: 'admin@test.com', password: '123456' });
  await request(app)
    .post('/users')
    .set({ Authorization: `Bearer ${response.body.access_token}` })
    .send({
      email: 'usersf@test.com',
      password: 'test',
      firstName: 'user',
      lastName: 'test',
      roleId: 1,
    });
  const respon = await request(app)
    .post('/auth/login')
    .send({ email: 'usersf@test.com', password: 'test' });

  const { access_token: accessToken } = respon.body;
  token = accessToken;
});

// describe('Response GET method to Entries', () => {
//   it('Should receive 200 status code', async () => {
//     const res = await request(app).get('/entries');
//     expect(res.body).toEqual([
//       expect.objectContaining({
//         id: expect.any(Number),
//         title: expect.any(String),
//         content: expect.any(String),
//         image: expect.any(String),
//         typeId: expect.any(Number),
//         type: expect.any(String),
//         createdAt: expect.any(String),
//       }),
//     ]);
//     expect(res.statusCode).toBe(200);
//   });
// });

describe('Response GET method to entries types', () => {
  it('Should receive 200 status code', async () => {
    const res = await request(app).get('/entries/types');
    expect(res.body).toEqual([
      {
        id: expect.any(Number),
        type: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
      {
        id: expect.any(Number),
        type: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ]);
    expect(res.statusCode).toBe(200);
  });
});

describe('Response POST method to Entries', () => {
  it('Should receive "201" status code', async () => {
    const res = await request(app)
      .post('/entries')
      .set({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      })
      .send({
        title: 'Some Title',
        content: 'Some Content',
        image: 'some image',
        typeId: 1,
      });
    expect(res.statusCode).toBe(201);
  });

  it('Should receive "201" status code: no limit in content', async () => {
    const res = await request(app)
      .post('/entries')
      .set({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      })
      .send({
        title: 'Some Title',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt pariatur libero doloremque nihil, nobis voluptatem nulla distinctio odio officiis, minus accusantium, provident voluptate molestias tenetur quae a quibusdam! Dignissimos ad, quas molestias consequuntur debitis distinctio, eius repellat dolor voluptatem delectus perspiciatis inventore necessitatibus tenetur! Molestiae blanditiis dolorem explicabo cumque veniam doloremque officiis assumenda, exercitationem optio repellat modi iusto placeat voluptatem quod tenetur eius beatae. Hic, aliquam ipsam odio ipsum doloremque nemo voluptates sed totam libero placeat, natus reiciendis? Eveniet non amet quidem vitae modi numquam molestias rerum, perferendis quod, qui aliquam repellendus cum? Doloremque officiis esse aliquid mollitia nemo soluta numquam alias sapiente laboriosam adipisci cum ipsum quaerat quasi quibusdam, neque earum consequuntur provident in! Voluptatibus quam velit odit culpa, reiciendis molestias hic eveniet corrupti.',
        image: 'some image',
        typeId: 1,
      });
    expect(res.statusCode).toBe(201);
  });

  it('Should send status 401: No auth token', async () => {
    const res = await request(app).post('/entries');
    expect(res.body).toEqual({
      error: 'Unauthorized',
      message: 'No auth token',
      statusCode: 401,
    });
    expect(res.status).toBe(401);
  });

  it('Should send status 400: Title empty', async () => {
    const res = await request(app)
      .post('/entries')
      .set({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      })
      .send({
        title: '',
        content: 'Some Content',
        typeId: 1,
      });
    expect(res.body).toEqual({
      error: 'Bad Request',
      message: messages.TITLE_EMPTY,
      statusCode: 400,
    });
    expect(res.statusCode).toBe(400);
  });

  it('Should send status 400: Content empty', async () => {
    const res = await request(app)
      .post('/entries')
      .set({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      })
      .send({
        title: 'Some Title',
        content: '',
        typeId: 1,
      });
    expect(res.body).toEqual({
      error: 'Bad Request',
      message: messages.CONTENT_EMPTY,
      statusCode: 400,
    });
    expect(res.statusCode).toBe(400);
  });
  it('Should send status 400: Type empty', async () => {
    const res = await request(app)
      .post('/entries')
      .set({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      })
      .send({
        title: 'Some Title',
        content: 'Some Content',
        typeId: '',
      });
    expect(res.body).toEqual({
      error: 'Bad Request',
      message: messages.TYPE_EMPTY,
      statusCode: 400,
    });
    expect(res.statusCode).toBe(400);
  });
  it('Should send status 400: Type id error', async () => {
    const res = await request(app)
      .post('/entries')
      .set({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      })
      .send({
        title: 'Some Title',
        content: 'Some Content',
        image: 'Some URL path',
        typeId: 200,
      });
    expect(res.body).toEqual({
      error: 'Bad Request',
      message: messages.ENTRY_TYPE_ID,
      statusCode: 400,
    });
    expect(res.statusCode).toBe(400);
  });
});

describe('Response GET/:id method to Entries route', () => {
  it('Should receive "200" status code', async () => {
    const res = await request(app).get(`/entries/1`);
    expect(res.body).toEqual({
      id: expect.any(Number),
      title: expect.any(String),
      content: expect.any(String),
      image: expect.any(String),
      typeId: expect.any(Number),
      createdAt: expect.any(String),
    });
    expect(res.statusCode).toBe(200);
  });

  it('Should receive status code 400: Bad Request', async () => {
    const res = await request(app).get(`/entries/s`);
    expect(res.body).toEqual({
      error: 'Bad Request',
      message: messages.INVALID_PARAM_ID,
      statusCode: 400,
    });
    expect(res.statusCode).toBe(400);
  });

  it('Should receive status code 404: Entry not found', async () => {
    const res = await request(app).get('/entries/1234');
    expect(res.body).toEqual({
      error: 'Not Found',
      message: messages.ENTRY_NOT_FOUND,
      statusCode: 404,
    });
    expect(res.statusCode).toBe(404);
  });
});

describe('Response PUT/:id method to Entries route', () => {
  it('Should receive "201" status code', async () => {
    const res = await request(app)
      .put(`/entries/1`)
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        title: 'New Title',
        content: 'New Content',
        image: 'New URL path',
        typeId: 2,
      });
    expect(res.statusCode).toBe(201);
  });

  it('Should receive status code 401: No auth token', async () => {
    const res = await request(app).put(`/entries/1`);
    expect(res.body).toEqual({
      error: 'Unauthorized',
      message: 'No auth token',
      statusCode: 401,
    });
    expect(res.statusCode).toBe(401);
  });

  it('Should receive status code 400: Bad Request', async () => {
    const res = await request(app)
      .put(`/entries/s`)
      .set({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
    expect(res.body).toEqual({
      error: 'Bad Request',
      message: messages.INVALID_PARAM_ID,
      statusCode: 400,
    });
    expect(res.statusCode).toBe(400);
  });

  it('Should receive status code 404: Not Found', async () => {
    const res = await request(app)
      .put(`/entries/200`)
      .set({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      })
      .send({
        title: 'New Title',
        content: 'New Content',
        image: 'New URL path',
        typeId: 2,
      });
    expect(res.body).toEqual({
      error: 'Not Found',
      message: messages.ENTRY_BY_ID_NOT_FOUND,
      statusCode: 404,
    });
    expect(res.statusCode).toBe(404);
  });

  it('Should send status 400: Title empty', async () => {
    const res = await request(app)
      .put(`/entries/1`)
      .set({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      })
      .send({
        title: '',
        content: 'New Content',
        image: 'New URL path',
        typeId: 2,
      });
    expect(res.body).toEqual({
      error: 'Bad Request',
      message: messages.TITLE_EMPTY,
      statusCode: 400,
    });
    expect(res.statusCode).toBe(400);
  });

  it('Should send status code 400: Content empty', async () => {
    const res = await request(app)
      .put(`/entries/1`)
      .set({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      })
      .send({
        title: 'New Title',
        content: '',
        image: 'New URL path',
        typeId: 2,
      });
    expect(res.body).toEqual({
      error: 'Bad Request',
      message: messages.CONTENT_EMPTY,
      statusCode: 400,
    });
    expect(res.statusCode).toBe(400);
  });

  it('Should send status code 400: Type empty', async () => {
    const res = await request(app)
      .put(`/entries/1`)
      .set({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      })
      .send({
        title: 'Title',
        content: 'New Content',
        image: 'New URL path',
        typeId: '',
      });
    expect(res.body).toEqual({
      error: 'Bad Request',
      message: messages.TYPE_EMPTY,
      statusCode: 400,
    });
    expect(res.statusCode).toBe(400);
  });
});

describe('Response DELETE/:id method to Entries route', () => {
  it('Should receive "204" status code', async () => {
    const res = await request(app)
      .delete(`/entries/1`)
      .set({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
    expect(res.statusCode).toBe(204);
  });

  it('Should receive status code 400: Bad Request', async () => {
    const res = await request(app)
      .delete(`/entries/s`)
      .set({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
    expect(res.body).toEqual({
      error: 'Bad Request',
      message: messages.INVALID_PARAM_ID,
      statusCode: 400,
    });
    expect(res.statusCode).toBe(400);
  });

  it('Should receive status code 404: Entry not found', async () => {
    const res = await request(app)
      .delete('/entries/456')
      .set({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
    expect(res.body).toEqual({
      error: 'Not Found',
      message: messages.ENTRY_NOT_FOUND,
      statusCode: 404,
    });
    expect(res.statusCode).toEqual(404);
  });

  it('Should receive status 401: Not auth token', async () => {
    const res = await request(app).delete(`/entries/1`).set({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: null,
    });
    expect(res.body).toEqual({
      error: 'Unauthorized',
      message: 'No auth token',
      statusCode: 401,
    });
    expect(res.statusCode).toBe(401);
  });
});

afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});
