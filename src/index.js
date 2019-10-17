//For expressjs

const express = require('express');
require('./db/mongoose');  //establishes connection with mongodb
const User = require('./models/user');
const Task = require('./models/task');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //grabs the req with json format

app.post('/users',(req,res)=>{
    const user = new User(req.body);
    user.save().then((r)=>{
        res.status(201).send(r);
    }).catch((e)=>{
        res.status(400).send(e);
    }
);
});

app.post('/tasks',(req,res)=>{
    const task = new Task(req.body);
    task.save().then((r)=>{
        res.status(201).send(r);
    }).catch((e)=>{
        res.status(400).send(e);
    })
})

app.listen(port,()=>{
    console.log('Server is up on port'+ port);
});