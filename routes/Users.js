// User routes

import express from 'express';
import Sequelize from 'sequelize';
import UsersModel from '../models/Users.js';

const router = express.Router();

const sequelize = new Sequelize('dogbook', 'snovosel', 'Flwr1281!', {
  dialect: 'postgresql',
  host: "localhost",
  port: 5432,
  define: {
    timestamps: false
  }
});

const Users = UsersModel(sequelize, Sequelize)

// router.get('/get', (req, res) => res.send('users motherfucka!'));

router.get('/get', (req, res) => {
  Users.findAll().then(users => {
    if (users.length === 0) {
      res.send({"users": "no sir bob"});
    }
    res.send({"users": users});
  });
});

module.exports = router;
