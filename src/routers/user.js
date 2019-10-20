const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.post('/users', async (req,res)=>{
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

router.patch('/users/:id', async (req,res)=>{
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

router.delete('/users/:id',async (req,res)=>{
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

router.get('/users', async (req,res)=>{

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

router.get('/users/:id',async (req,res)=>{
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
module.exports = router;