import fs from "fs";
import bcrypt from "bcryptjs";
import {
  readdirSync,
  rename,
  writeFile,
  copyFile,
  mkdirSync,
  chmodSync
} from "fs";

import jwt from "jsonwebtoken";
import config from "../config/config.jwt.js";

import { User, Photo } from "../models/index.js";

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

exports.isUserEmailTaken = (req, res) => {
  User.findOne({ where: { email: req.params.userEmail } }).then(user => {
    if (user === null) {
      res.send({ doesUserExist: false, test: "bitch" });
    } else {
      res.send({ doesUserExist: true, test: "bitch" });
    }
  });
};

// -- get all users --
exports.getAllUsers = (req, res) => {
  User.findAll().then(users => {
    if (users.length === 0) {
      res.send({ users: "no users found" });
    } else {
      res.send({ users: users });
    }
  });
};

// -- find user by id --
exports.getUserById = (req, res) => {
  User.findOne({
    where: { id: req.params.userId },
    include: [{ model: Photo }]
  }).then(user => {
    res.send({ user });
  });
};

// -- create new user if does not exist --
exports.createUser = (req, res) => {
  const userInfo = JSON.parse(req.body.data);
  /* create the user model and save it to the DB */
  User.findOrCreate({
    where: {
      email: userInfo.email
    },
    defaults: {
      password: bcrypt.hashSync(userInfo.password, 10),
      pet_name: userInfo.pet_name
    }
  })
    .spread((newUser, created) => {
      /* if the user model was correctly saved to the DB, the next step is to
      create a user directory with the new user Id. In that folder we will save
       all of the environment's user photos and files */
      if (created) {
        const userDirectory = "./uploads/" + newUser.id;
        mkdirSync(userDirectory);

        if (req.file) {
          /* here we are going to move the photo from the request to the newly
          created user directory within the uploads folder */
          const pathToSaveImage =
            "./uploads/" + newUser.id + "/" + req.file.originalname + ".jpg";

          rename(req.file.path, pathToSaveImage, err => {
            if (err) console.log("error renaming file");

            Photo.create({
              file_name: req.file.originalname,
              is_profile_picture: true,
              UserId: newUser.id
            }).catch(e => {
              console.log("error saving photo", e);
            });
          });
        }
      }

      let token = jwt.sign({ newUser }, config.secret, { expiresIn: "24h" });

      res.send({
        success: true,
        token: token,
        user: newUser
      });
    })
    .catch(error => {
      console.log("error", error);
    });
};

// -- set user password --
exports.setUserPassword = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      // generate hash from user provided password
      const hash = bcrypt.hashSync(req.body.password, 10);

      // update user model password columnn specifically with hash
      user
        .update({ password: hash })
        .then(updatedUser => {
          // return the updated user to the client
          res.send({ user: updatedUser });
        })
        .catch(e => {
          res.status(500).send("could not update the password of this user");
        });
    })
    .catch(e => {
      res.status(500).send("Could not locate user by that id");
    });
};

// -- update an existing user --
exports.updateUser = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      user
        .update(req.body)
        .then(updatedUser => {
          res.send({ user: updatedUser });
        })
        .catch(e => {
          res.status(500).send("Could not update the requested entity");
        });
    })
    .catch(e => {
      res.status(500).send("Could not locate user by that id");
    });
};
