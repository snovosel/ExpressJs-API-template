// User routes
import express from 'express';
import photosController from '../controllers/Photos.js';

const router = express.Router();

import multer from 'multer';

const upload = multer({
  dest: "../uploads"
});

// create new user
router.post('/:userId/:isProfilePicture', upload.single("image"), photosController.uploadPhoto);

module.exports = router;
