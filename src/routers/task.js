const Task = require('../models/task');
const express = require('express');
const router = new express.Router();

router.patch('/tasks/:id', async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description','completed'];
    const _id = req.params.id;
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(404).send();
    }
    try{
        //update doesn't wait for middleware so reconfiguring
        const task = await  Task.findByIdAndUpdate(_id);
        updates.forEach((update)=>{
            task[update]=req.body[update];
        });

        await task.save();
        //const task= await Task.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true});
        if(!task){
           return res.status(404).send();
        }
        res.send(task);
    }catch(e){
        res.status(500).send(e);
    }

});



router.delete('/tasks/:id',async (req,res)=>{
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

router.post('/tasks',async (req,res)=>{
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


router.get('/tasks', async (req,res)=>{
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

router.get('/tasks/:id',async (req,res)=>{
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


module.exports = router;