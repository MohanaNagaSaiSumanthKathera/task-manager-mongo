const Task = require('../models/task');
const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();

router.patch('/tasks/:id',auth, async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description','completed'];
    const _id = req.params.id;
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(404).send();
    }
    try{

        //update doesn't wait for middleware so reconfiguring
        const task = await  Task.findById({_id,owner:req.user._id});
        if(!task){
            return res.status(404).send();
         }
        updates.forEach((update)=>{
            task[update]=req.body[update];
        });

        await task.save();
        //const task= await Task.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true});
        
        res.send(task);
    }catch(e){
        res.status(500).send(e);
    }

});



router.delete('/tasks/:id',auth,async (req,res)=>{
    const _id = req.params.id;

    try{
       const task = await Task.findOneAndDelete({_id,owner:req.user._id});
       if(!task){
        return res.status(404).send();
      }
      res.send(task);
    }catch(e){
        res.status(500).send(e);
    }
});

router.post('/tasks',auth,async (req,res)=>{
    //const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner:req.user._id
    });
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

//using query params
router.get('/tasks',auth, async (req,res)=>{
    const match = {}
    const sort = {}
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }
    if(req.query.completed){
        match.completed = req.query.completed === 'true';
    }
    try{
        //const task =await Task.find({owner:req.user._id});
        await req.user.populate({
            path : 'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip : parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        res.send(req.user.tasks);
    }catch(e){
        res.status(500).send(e);
    }

    // Task.find({}).then((r)=>{
    //     res.send(r);
    // }).catch((e)=>{
    //     res.status(500).send(e);
    // });
});

router.get('/tasks/:id',auth,async (req,res)=>{
    const _id = req.params.id;

    try{
        //const task = await Task.findById(_id);
        const task = await Task.findOne({_id, owner: req.user._id});

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