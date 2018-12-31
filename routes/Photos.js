// User routes
import express from 'express';
import photosController from '../controllers/Photos.js';

const router = express.Router();

// create new user
router.post('/:userId', photosController.uploadPhoto);

module.exports = router;
