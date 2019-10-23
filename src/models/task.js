/*  creating Tasks model */
const mongoose = require('mongoose');
const validator = require('validator');

const taskScheme = new mongoose.Schema({
    description:{
        type : String,
        trim:true,
        required: true
    },
    completed:{
        type: Boolean,
        default:false
    },
    owner:{
        required:true,
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},{
    timestamps: true
})
const Task = mongoose.model('Task',taskScheme);

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