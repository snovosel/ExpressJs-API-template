import fs from 'fs';
import bcrypt from 'bcryptjs';
import { readdirSync, rename } from 'fs';

import { User, Photo } from '../models/index.js';

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

exports.isUserEmailTaken = (req, res) => {
  User.findOne({ where: { email: req.params.userEmail }}).then(user => {
    if (user === null) {
      res.send({ doesUserExist: false, test: 'bitch' })
    } else {
      res.send({ doesUserExist: true, test: 'bitch' });
    }
  });
}

// -- get all users --
exports.getAllUsers = (req, res) => {
  User.findAll().then(users => {
    if (users.length === 0) {
      res.send({"users": "no users found"});
    } else {
      res.send({"users": users});
    }
  });
}

// -- find user by id --
exports.getUserById = (req, res) => {
  User.findOne({
    where: { id: req.params.userId },
    include: [{ model: Photo }]
  }).then(user => {
    res.send({ user })
  });
};

// -- create new user if does not exist --
exports.createUser = (req, res) => {
  const userInfo = JSON.parse(req.body.data);
  console.log('userInfo', userInfo);

  if (req.file) {
    const profiloPhotoFile = req.file
    const pathToSaveImage = './uploads/' + req.file.originalname + '.jpg';
    const tempPath = req.file.path;

    rename(tempPath, pathToSaveImage, err => {
      if (err) return handleError(err, res);
    });
  } else {
    console.log('no photo provided');
  }


  // User.findOrCreate({
  //   where: {
  //     email: req.body.email
  //   },
  //   defaults: {
  //     password: bcrypt.hashSync(req.body.password, 10),
  //     pet_name: req.body.pet_name
  //   }
  // }).spread((newUser, created) => {
  //   // create a user directory for uploading photos etc
  //   if (created) {
  //     const userDirectory = './uploads/' + newUser.id;
  //     fs.mkdirSync(userDirectory);
  //   }
  //
  //   // send user back to client
  //   res.send({ newUser });
  // });
}

// -- set user password --
exports.setUserPassword = (req, res) => {
  User.findById(req.params.userId).then((user) => {
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

// -- update an existing user --
exports.updateUser = (req, res) => {
  User.findById(req.params.userId).then((user) => {
    user.update(req.body).then((updatedUser) => {
      res.send({ user: updatedUser });
    }).catch(e => {
      res.status(500).send("Could not update the requested entity");
    });
  }).catch(e => {
    res.status(500).send("Could not locate user by that id");
  });
}
