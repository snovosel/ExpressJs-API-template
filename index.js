import express from 'express';
import bodyParser from 'body-parser';
// import routers
import indexRouter from './routes/Index.js';
import usersRouter from './routes/Users.js';
import photosRouter from './routes/Photos.js';

const app = express();
const port = 3000;

// for ability to read from body
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// index routes
app.use('/', indexRouter);
// user routes
app.use('/users', usersRouter);
// photo routes
app.use('/photos', photosRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
