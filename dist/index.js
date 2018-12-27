'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Index = require('./routes/Index.js');

var _Index2 = _interopRequireDefault(_Index);

var _Users = require('./routes/Users.js');

var _Users2 = _interopRequireDefault(_Users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import routers
var app = (0, _express2.default)();
var port = 3000;

// index routes
app.use('/', _Index2.default);

// user routes
app.use('/users', _Users2.default);

app.listen(port, function () {
  return console.log('Example app listening on port ' + port + '!');
});