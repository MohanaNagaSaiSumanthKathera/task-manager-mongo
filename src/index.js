//For expressjs

const express = require('express');
require('./db/mongoose');  //establishes connection with mongodb
const userRouter = require('../src/routers/user');
const taskRouter = require('../src/routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //grabs the req with json format
app.use(userRouter);
app.use(taskRouter);

app.listen(port,()=>{
    console.log('Server is up on port'+ port);
});