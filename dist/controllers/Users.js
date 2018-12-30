"use strict";

var _index = require("../models/index.js");

exports.getAllUsers = function (req, res) {
  _index.Users.findAll().then(function (users) {
    if (users.length === 0) {
      res.send({ "users": "no sir bob" });
    }
    res.send({ "users": users });
  });
}; // import Sequelize from 'sequelize';
// import UsersModel from '../models/users.js';

// const sequelize = new Sequelize('dogbook', 'snovosel', 'Flwr1281!', {
//   dialect: 'postgresql',
//   host: "localhost",
//   port: 5432,
//   define: {
//     timestamps: false
//   }
// });

// const Users = UsersModel(sequelize, Sequelize);

exports.createUser = function (req, res) {
  _index.Users.findOrCreate({ where: { email: req.body.email } }).spread(function (user, created) {
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