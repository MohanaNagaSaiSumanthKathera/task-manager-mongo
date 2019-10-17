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
});

app.get('/users',(req,res)=>{
    User.find({}).then((r)=>{
        res.send(r);
    }).catch((e)=>{
        res.status(500).send(e);
    });
});

app.get('/users/:id',(req,res)=>{
    const _id = req.params.id;

    User.findById(_id).then((r)=>{
        if(!r){
          return res.status(404).send();
        }
        res.send(r);
    }).catch((e)=>{
        res.status(500).send(e);
    });
});

app.get('/tasks',(req,res)=>{
    Task.find({}).then((r)=>{
        res.send(r);
    }).catch((e)=>{
        res.status(500).send(e);
    });
});

app.get('/tasks/:id',(req,res)=>{
    const _id = req.params.id;

    Task.findById(_id).then((r)=>{
        if(!r){
           return res.status(404).send();
        }
        res.send(r);
    }).catch((e)=>{
        res.status(500).send(e);
    });
});

app.listen(port,()=>{
    console.log('Server is up on port'+ port);
});