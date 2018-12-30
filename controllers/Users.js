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
        res.status(500);
        res.send('Error: this email has already been taken');
      }
    })
}

exports.updateUser = (req, res) => {
  Users.findById(req.params.userId).then((user) => {
    user.update(req.body).then((updatedUser) => {
      res.send({ user: updatedUser });
    }).catch(e => {
      res.status(500);
      res.send("Could not update the requested entity");
    });
  }).catch(e => {
    res.status(500);
    res.send("Could not locate user by that id");
  });
}
