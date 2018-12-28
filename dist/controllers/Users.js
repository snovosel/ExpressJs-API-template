'use strict';

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _Users = require('../models/Users.js');

var _Users2 = _interopRequireDefault(_Users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequelize = new _sequelize2.default('dogbook', 'snovosel', 'Flwr1281!', {
  dialect: 'postgresql',
  host: "localhost",
  port: 5432,
  define: {
    timestamps: false
  }
});

var Users = (0, _Users2.default)(sequelize, _sequelize2.default);

exports.getAllUsers = function (req, res) {
  Users.findAll().then(function (users) {
    if (users.length === 0) {
      res.send({ "users": "no sir bob" });
    }
    res.send({ "users": users });
  });
};

exports.createUser = function (req, res) {
  Users.findOrCreate({ where: { email: req.body.email } }).spread(function (user, created) {
    var userResponse = user.get({ plan: true });

    if (created === true) {
      res.send({ user: userResponse });
    } else {
      res.status(500);
      res.send('Error: this email has already been taken');
    }
  });
};

// router.get('/get', (req, res) => {
//   Users.findAll().then(users => {
//     if (users.length === 0) {
//       res.send({"users": "no sir bob"});
//     }
//     res.send({"users": users});
//   });
// });