'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _Index = require('./routes/Index.js');

var _Index2 = _interopRequireDefault(_Index);

var _Users = require('./routes/Users.js');

var _Users2 = _interopRequireDefault(_Users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import routers
var app = (0, _express2.default)();
var port = 3000;

// for ability to read from body
// app.use(bodyParser);
app.use(_bodyParser2.default.urlencoded({ extended: true }));

// parse application/json
app.use(_bodyParser2.default.json());

// index routes
app.use('/', _Index2.default);
// user routes
app.use('/users', _Users2.default);

app.listen(port, function () {
  return console.log('Example app listening on port ' + port + '!');
});