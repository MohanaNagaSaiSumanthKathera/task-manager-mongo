const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id : userOneId,
    name : 'Sumanth',
    email : 'mohanasai.sumanth@gmail.com',
    password : 'Sush123',
    tokens:[{
        token: jwt.sign({_id : userOneId},process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id : userTwoId,
    name : 'Vijaya',
    email : 'vijaya@gmail.com',
    password : 'Sush123',
    tokens:[{
        token: jwt.sign({_id : userTwoId},process.env.JWT_SECRET)
    }]
};

const taskOneId = new mongoose.Types.ObjectId();
const taskOne={
    _id : taskOneId,
    description:'I completed node course',
    completed:true,
    owner:userOneId
}

const taskTwoId = new mongoose.Types.ObjectId();
const taskTwo={
    _id : taskTwoId,
    description:'I completed React course',
    completed:false,
    owner:userOneId
}

const taskThreeId = new mongoose.Types.ObjectId();
const taskThree={
    _id : taskThreeId,
    description:'I completed mulesoft course',
    owner:userTwoId
}

const setUpDatabase=async()=>{
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
}

module.exports={
    userOneId,userOne,setUpDatabase,userTwo,userTwoId,taskOne,taskOneId,taskThree,taskThreeId,taskTwo,taskTwoId
}