import express from 'express';

// import routers
import indexRouter from './routes/Index.js';
import usersRouter from './routes/Users.js';

const app = express();
const port = 3000;

// index routes
app.use('/', indexRouter);

// user routes
app.use('/users', usersRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
