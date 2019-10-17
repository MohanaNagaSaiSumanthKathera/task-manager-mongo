
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex:true
});



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

// const taskdata = new Task({
//     description:  "  Do Home work     ",
//     completed: true
    
// });

// taskdata.save().then(r=>{
//     console.log(r);
// }).catch(e=>{
//     console.log(e);
// })

