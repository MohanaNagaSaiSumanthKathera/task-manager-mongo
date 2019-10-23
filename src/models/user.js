const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const Task = require('../models/task');

const userSchema = new mongoose.Schema({
    name :{
        type: String,
        required : true,
        trim: true  
    },
    password:{
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password contains password');
            }
        }

    },
    email:{
        type: String,
        unique: true, //when added in middle, drop db to apply the change
        required: true,
        trim:true,
        lowercase:true,
        validate(value){
            //validator package to validate complex fields
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    age:{
        type : Number,
        default: 0,
        validate(value){
            if(value<0){
                throw new Error('Age must be a positive number');
            }
        }
    },
    tokens:[{
        token:{
            type: String,
            required:true
        }
    }]
},{
    timestamps:true
});

userSchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON= function(){
    const user = this;
    const userObject = user.toObject();
   
    delete userObject.password;
    delete userObject.tokens;
    
    return userObject;
}

userSchema.methods.generateAuthToken=async function(){
    const user = this;
    const token = jwt.sign({_id : user._id.toString()},"thisismynew");
    user.tokens = user.tokens.concat({token});
    await user.save();

    return token;
}
//verify login credentials using bcryptjs
userSchema.statics.findOneByCredentials=async(email,password)=>{

    const user =await User.findOne({email});
    if(!user){
        throw new Error('unable to login');
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        throw new Error('Unable to login');
    }

    return user;
}

//using the middleware functionality to hash password
userSchema.pre('save',async function(next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }
    next();
});

//using the middleware functionality to delete associate tasks for user
userSchema.pre('remove',async function(next){
    const user = this;

    await Task.deleteMany({ owner:user._id});
    
    next();
})

const User = mongoose.model('User',userSchema);

module.exports = User;


/* Creating user model */

//******inserting user data****

// const me = new User({
//     name : '  Chuchu koona ',
//     email: '  Sushma@gmail.com  ',
//     age: 19,
//     password: 'sumanth'
// });

// me.save().then(r=>{
//     console.log(r);
// }).catch(e=>{
//     console.log(e);
// });
