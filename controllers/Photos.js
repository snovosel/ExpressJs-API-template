import multer from 'multer';
import { readdirSync, rename } from 'fs';

import { Photo } from '../models/index.js';

const upload = multer({
  dest: "../uploads"
});

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

exports.uploadPhoto = (req, res) => {
  const uploads = './uploads';
  const userDirectories = readdirSync(uploads);
  const userDir = userDirectories.find(dir => dir == req.params.userId);

  const tempPath = req.file.path;
  const pathToSaveImage = './uploads/' + userDir + '/' + req.file.originalname;

  rename(tempPath, pathToSaveImage, err => {
    if (err) return handleError(err, res);

    Photo.create({
      file_path: pathToSaveImage,
      is_profile_picture: req.params.isProfilePicture,
    }).then(photo => {
      res.status(200).send({photo});
    });
  });
}
