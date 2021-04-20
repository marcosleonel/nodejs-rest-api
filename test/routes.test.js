const Hapi = require('@hapi/hapi');
const request = require('supertest');
const routes = require('../server/routes');
const db = require('../db/db');

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
});

server.route([...routes]);

describe('User routes', () => {
  beforeAll(async () => { // eslint-disable-line
    await server.start();
    await db.sync({ force: true });
  });

  afterAll(async () => { // eslint-disable-line
    await server.stop();
  });

  it('should return Status Code 201 for /cities POST method', () => { // eslint-disable-line
    const url = '/v1/cities?name=Novigrad&state=Nothern Realms';

    return request(server.listener)
      .post(encodeURI(url))
      .then((response) => {
        expect(response.statusCode).toBe(201);
      });
  });

  it('should return Status Code 201 for /customers POST method', () => { // eslint-disable-line
    const url = '/v1/customers?fullName=Geralt of Rivia&gender=Masculino&birthdate=02/03/1200&age=38&city=Rivia'; // eslint-disable-line

    return request(server.listener)
      .post(encodeURI(url))
      .then((response) => {
        expect(response.statusCode).toBe(201);
      });
  });
});
