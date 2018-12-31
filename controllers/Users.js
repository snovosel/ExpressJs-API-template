import bcrypt from 'bcryptjs';

import { Users } from '../models/index.js';

// get all users
exports.getAllUsers = (req, res) => {
  Users.findAll().then(users => {
    if (users.length === 0) {
      res.send({"users": "no users found"});
    }
    res.send({"users": users});
  });
}

// add user
exports.createUser = (req, res) => {
  Users
    .findOrCreate({ where: { email: req.body.email }})
    .spread((user, created) => {
      const userResponse = user.get({ plan: true });

      if (created === true) {
        res.send({ user: userResponse });
      } else {
        res.status(500).send('Error: this email has already been taken');
      }
    })
}

exports.updateUser = (req, res) => {
  Users.findById(req.params.userId).then((user) => {
    user.update(req.body).then((updatedUser) => {
      res.send({ user: updatedUser });
    }).catch(e => {
      res.status(500).send("Could not update the requested entity");
    });
  }).catch(e => {
    res.status(500).send("Could not locate user by that id");
  });
}

exports.setUserPassword = (req, res) => {
  Users.findById(req.params.userId).then((user) => {
    // generate hash from user provided password
    const hash = bcrypt.hashSync(req.body.password, 10);

    // update user model password columnn specifically with hash
    user.update({ password: hash }).then((updatedUser) => {

      // return the updated user to the client
      res.send({ user: updatedUser });

    }).catch(e => {

      res.status(500).send("could not update the password of this user");
    });
  }).catch(e => {

    res.status(500).send("Could not locate user by that id");
  });
}
