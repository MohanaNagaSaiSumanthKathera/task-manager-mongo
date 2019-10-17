
const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex:true
});

/* Creating user model */
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


/*  creating Tasks model */

const Task = mongoose.model('Task',{
    description:{
        type : String,
        trim:true,
        required: true
    },
    completed:{
        type: Boolean,
        default:false
    }
});

const taskdata = new Task({
    description:  "  Do Home work     ",
    completed: true
    
});

taskdata.save().then(r=>{
    console.log(r);
}).catch(e=>{
    console.log(e);
})

