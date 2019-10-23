//For expressjs

const express = require('express');
require('./db/mongoose');  //establishes connection with mongodb
const userRouter = require('../src/routers/user');
const taskRouter = require('../src/routers/task');

const app = express();
const port = process.env.PORT || 3000;

//no middleware:: new request -> run route handler
//with middleware:: new request -> do something(like authentication) -> run route handler

// app.use((req,res,next)=>{
//    if(req.method==='POST')
//    {
//      res.status(404).send('post requests not allowed')
//    }
//    else{
//         next();
//    }
// })

// app.use((req,res,next)=>{
//     res.status(503).send('under maintainance');
// })

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

//using jwt tokens demo

// const jwt = require('jsonwebtoken');

// const myfunc = async()=>{
//     const token = await jwt.sign({_id: 121321},"SushmaKoona",{expiresIn:"7d"});
//     console.log(token);

//     const value = await jwt.verify(token,"SushmaKoona");
//     console.log(value);
// }

// myfunc();