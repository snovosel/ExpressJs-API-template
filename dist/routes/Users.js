'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Users = require('../controllers/Users.js');

var _Users2 = _interopRequireDefault(_Users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// User routes

var router = _express2.default.Router();

// get all users
router.get('/', _Users2.default.getAllUsers);

// create new user
router.post('/', _Users2.default.createUser);

module.exports = router;