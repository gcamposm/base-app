const express = require('express');
const server = express();
const next = require('next');
const bodyParser = require('body-parser');
const nextI18NextMiddleware = require('next-i18next/middleware').default;
const cookieParser = require('cookie-parser');

require('dotenv').config();

const routes = require('./server/routes')();

const nextI18next = require('./i18n');

var port = process.env.PORT || 3005;
const dev = process.env.NODE_ENV === 'development';
const app = next({ dev });
const handler = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    server.use(cookieParser());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());
    server.use(routes);
    server.use(nextI18NextMiddleware(nextI18next));

    server.get('*', (req, res) => {
      return handler(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exitCode = 1;
  });
