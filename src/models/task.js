/*  creating Tasks model */
const mongoose = require('mongoose');
const validator = require('validator');

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

module.exports = Task;

// const taskdata = new Task({
//     description:  "  Do Home work     ",
//     completed: true
    
// });

// taskdata.save().then(r=>{
//     console.log(r);
// }).catch(e=>{
//     console.log(e);
// })