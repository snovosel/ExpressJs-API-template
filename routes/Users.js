// User routes
import express from 'express';
import usersController from '../controllers/Users.js';

const router = express.Router();

// get all users
router.get('/', usersController.getAllUsers);

// create new user
router.post('/', usersController.createUser);

//update user
router.patch('/:userId', usersController.updateUser);

module.exports = router;
