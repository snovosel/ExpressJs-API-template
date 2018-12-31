// User routes
import express from 'express';
import usersController from '../controllers/Users.js';

const router = express.Router();

// get all users
router.get('/', usersController.getAllUsers);

// get user by Id
router.get('/:userId', usersController.getUserById);

// create new user
router.post('/', usersController.createUser);

//update user
router.patch('/:userId', usersController.updateUser);

// set user password
router.patch('/password/:userId', usersController.setUserPassword);

module.exports = router;
