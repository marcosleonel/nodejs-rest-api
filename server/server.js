const Hapi = require('@hapi/hapi');
const Path = require('path');

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
  routes: {
    files: {
      relativeTo: Path.join(__dirname, 'public'),
    },
    cors: {
      credentials: false,
      origin: ['*'],
      headers: [
        'Access-Control-Allow-Origin',
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
        'If-None-Match',
      ],
    },
  },
});

module.exports = server;
