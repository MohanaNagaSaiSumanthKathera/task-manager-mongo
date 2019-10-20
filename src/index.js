//For expressjs

const express = require('express');
require('./db/mongoose');  //establishes connection with mongodb
const User = require('./models/user');
const Task = require('./models/task');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //grabs the req with json format

app.post('/users', async (req,res)=>{
    const user = new User(req.body);

    try{
        await user.save();
        res.status(201).send(user);
    } catch(e){
        res.status(400).send(e);
        console.log(e);
    }
    
    // user.save().then((r)=>{
    //     res.status(201).send(r);
    // }).catch((e)=>{
    //     res.status(400).send(e);
    // }
// );
});

app.patch('/users/:id', async (req,res)=>{
    const updates = Object.keys(req.body);
    console.log(updates);
    const allowedUpdates = ['name','email','password','age'];
    const _id = req.params.id;
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));
    console.log(isValidOperation);
    if(!isValidOperation){
        return res.status(404).send();
    }
    try{
        const user= await User.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true});
        if(!user){
           return res.status(404).send();
        }
        res.send(user);
    }catch(e){
        res.status(500).send(e);
    }

});


app.patch('/tasks/:id', async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description','completed'];
    const _id = req.params.id;
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(404).send();
    }
    try{
        const task= await Task.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true});
        if(!task){
           return res.status(404).send();
        }
        res.send(task);
    }catch(e){
        res.status(500).send(e);
    }

});

app.delete('/users/:id',async (req,res)=>{
    const _id = req.params.id;

    try{
       const user = await User.findByIdAndDelete(_id);
       if(!user){
        return res.status(404).send();
      }
      res.send(user);
    }catch(e){
        res.status(500).send(e);
    }
});

app.delete('/tasks/:id',async (req,res)=>{
    const _id = req.params.id;

    try{
       const task = await Task.findByIdAndDelete(_id);
       if(!task){
        return res.status(404).send();
      }
      res.send(task);
    }catch(e){
        res.status(500).send(e);
    }
});

app.post('/tasks',async (req,res)=>{
    const task = new Task(req.body);

    try{
        await task.save();
        res.status(201).send(task);
    } catch(e){
        res.status(400).send(e);
        console.log(e);
    }
    // task.save().then((r)=>{
    //     res.status(201).send(r);
    // }).catch((e)=>{
    //     res.status(400).send(e);
    // })
});

app.get('/users', async (req,res)=>{

    try{
        const user =await User.find({});
        res.send(user);
    }catch(e){
        res.status(500).send(e);
    }
    // User.find({}).then((r)=>{
    //     res.send(r);
    // }).catch((e)=>{
    //     res.status(500).send(e);
    // });
});

app.get('/users/:id',async (req,res)=>{
    const _id = req.params.id;

    try{
       const user = await User.findById(_id);
       if(!user){
        return res.status(404).send();
      }
      res.send(user);
    }catch(e){
        res.status(500).send(e);
    }
    // User.findById(_id).then((r)=>{
        // if(!r){
        //   return res.status(404).send();
        // }
        // res.send(r);
    // }).catch((e)=>{
    //     res.status(500).send(e);
    // });
});

app.get('/tasks', async (req,res)=>{
    try{
        const task =await Task.find({});
        res.send(task);
    }catch(e){
        res.status(500).send(e);
    }

    // Task.find({}).then((r)=>{
    //     res.send(r);
    // }).catch((e)=>{
    //     res.status(500).send(e);
    // });
});

app.get('/tasks/:id',async (req,res)=>{
    const _id = req.params.id;

    try{
        const task = await Task.findById(_id);
        if(!task){
         return res.status(404).send();
       }
       res.send(task);
     }catch(e){
         res.status(500).send(e);
     }
    // Task.findById(_id).then((r)=>{
    //     if(!r){
    //        return res.status(404).send();
    //     }
    //     res.send(r);
    // }).catch((e)=>{
    //     res.status(500).send(e);
    // });
});

app.listen(port,()=>{
    console.log('Server is up on port'+ port);
});