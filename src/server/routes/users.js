const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', (req, res, next) => {
  // res.json('test')
  knex('users')
  .then((data) => {
    res.status(200).json({
      status: 'success',
      data: data
    });
  })
  .catch((err) => {
    res.status(500).json({
      status: 'fail'
    });
  });
});

module.exports = router;
