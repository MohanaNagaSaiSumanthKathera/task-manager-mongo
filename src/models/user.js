const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User',{
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
    }
});

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
