const express = require('express');
require('./db/mongoose');  //establishes connection with mongodb
const userRouter = require('../src/routers/user');
const taskRouter = require('../src/routers/task');

const app = express();

app.use(express.json()); //grabs the req with json format
app.use(userRouter);
app.use(taskRouter);

module.exports = app;