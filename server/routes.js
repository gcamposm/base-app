/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-console */
const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');

module.exports = function() {
  const router = express.Router();

  router.post('/clearCookie', function(req, res) {
    res.clearCookie('ets3', { path: '/' });
    const options = {};
    options.maxAge = 60 * 60 * 24 * 30;
    options.path = '/';
    res.clearCookie('ets3', options);
    res.send('done');
  });

  router.get('/getDate', function(req, res) {
    res.send({ date: new Date() });
    res.end();
  });

  return router;
};
