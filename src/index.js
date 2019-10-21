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

// const bcrypt = require('bcryptjs');

// const myfunc=async()=>{
//     const password = "SushMohi@0623";
//     try{
//     const hashedpass = await bcrypt.hash(password,8);
     
//     const matched = await bcrypt.compare(password,hashedpass);
//     console.log(matched);
//     console.log(password);
//     console.log(hashedpass);
//     }
//     catch(e){
//         console.log(e);
//     }
// }

// myfunc();