'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _Users = require('../models/Users.js');

var _Users2 = _interopRequireDefault(_Users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // User routes

var sequelize = new _sequelize2.default('dogbook', 'snovosel', 'Flwr1281!', {
  dialect: 'postgresql',
  host: "localhost",
  port: 5432,
  define: {
    timestamps: false
  }
});

var Users = (0, _Users2.default)(sequelize, _sequelize2.default);

// router.get('/get', (req, res) => res.send('users motherfucka!'));

router.get('/get', function (req, res) {
  Users.findAll().then(function (users) {
    if (users.length === 0) {
      res.send({ "users": "no sir bob" });
    }
    res.send({ "users": users });
  });
});

module.exports = router;