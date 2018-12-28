'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Users = require('../controllers/Users.js');

var _Users2 = _interopRequireDefault(_Users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// User routes

var router = _express2.default.Router();

// router.get('/get', (req, res) => {
//   Users.findAll().then(users => {
//     if (users.length === 0) {
//       res.send({"users": "no sir bob"});
//     }
//     res.send({"users": users});
//   });
// });

router.get('/get', _Users2.default.getAllUsers);

module.exports = router;