
import { Photo } from '../models/index.js';


// const multer = require("multer");

// add user
exports.uploadPhoto = (req, res) => {
  Photo
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
