const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex:true
});

/* Creating user model */
const User = mongoose.model('User',{
    name :{
        type: String
    },
    age:{
        type : Number
    }
});

//******inserting user data****

// const me = new User({
//     name : 'Sushma',
//     age : 19
// });

// me.save().then(r=>{
//     console.log(r);
// }).catch(e=>{
//     console.log(e);
// });


/*  creating Tasks model */

const Task = mongoose.model('Task',{
    description:{
        type : String
    },
    completed:{
        type: Boolean
    }
});

const taskdata = new Task({
    description: "clean and fill water bottles",
    completed: false
});

taskdata.save().then(r=>{
    console.log(r);
}).catch(e=>{
    console.log(e);
})