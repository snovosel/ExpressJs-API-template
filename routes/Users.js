// User routes

import express from 'express';
import usersController from '../controllers/Users.js';

const router = express.Router();

// get all users
router.get('/get', usersController.getAllUsers);

module.exports = router;
