const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');

const upload = multer({
    dest : 'avatars'
});
router.post('/users/me/avatar',upload.single('upload'),async(req,res)=>{
    res.send();
})

router.post('/user/login',async (req,res)=>{
    try{
        const user = await User.findOneByCredentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken();
        res.send({user,token});
        //res.send({user : await user.getPublicProfile(),token});
    }catch(e){
        res.status(400).send();
    }
});

router.post('/user/logout',auth,async (req,res) =>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
           return token.token !== req.token;
        });
        await req.user.save();
        res.send('Logout successful');
    }catch(e){
        res.status(401).send("Unauthorized");
    }
});

router.post('/user/logoutAll',auth,async (req,res)=>{
    try{
        req.user.tokens =[];
        await req.user.save();
        res.send('LogoutALL successful');
    }catch(e){
        res.status(401).send("Unauthorized");
    }
})
router.post('/users', async (req,res)=>{
    const user = new User(req.body);

    try{
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user,token});
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

router.patch('/users/me',auth, async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name','email','password','age'];
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));
    if(!isValidOperation){
        return res.status(404).send();
    }
    try{
        updates.forEach((update)=>{
            req.user[update]=req.body[update];
        })
        console.log(req.user);
        await req.user.save();
        res.send(req.user);
    }catch(e){
        res.status(500).send(e);
    }

});

router.delete('/users/me',auth, async (req,res)=>{

    try{
    //    const user = await User.findByIdAndDelete(_id);
    //    if(!user){
    //     return res.status(404).send();
    //   }
        await req.user.remove();
         res.send(req.user);
    }catch(e){
        res.status(500).send(e);
    }
});

router.get('/users/me',auth, async (req,res)=>{
    res.send(req.user);
});

// router.get('/users/:id',async (req,res)=>{
//     const _id = req.params.id;

//     try{
//        const user = await User.findById(_id);
//        if(!user){
//         return res.status(404).send();
//       }
//       res.send(user);
//     }catch(e){
//         res.status(500).send(e);
//     }
//     // User.findById(_id).then((r)=>{
//         // if(!r){
//         //   return res.status(404).send();
//         // }
//         // res.send(r);
//     // }).catch((e)=>{
//     //     res.status(500).send(e);
//     // });
// });
module.exports = router;