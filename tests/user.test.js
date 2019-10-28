const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

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

beforeEach(async()=>{
    await User.deleteMany();
    await new User(userOne).save();

});

test('Should signup a new user', async()=>{
   const response= await request(app).post('/users').send({
            "age": 20,
            "name": "Sushma",
            "email": "Sushmaishere4u@gmail.com",
            "password": "Sush123"
    }).expect(201);
    console.log(response.body);
    //Assertion that the db was changed successfully
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull();

    //Assertion about the response
    expect(response.body).toMatchObject({
        user:{
            "name": "Sushma",
            "email": "sushmaishere4u@gmail.com"
        }
    });

    expect(user.password).not.toBe('Sush123');
}); 

test('Should login', async()=>{
    const response = await request(app).post('/user/login').send({
        "email" : "mohanasai.sumanth@gmail.com",
        "password" : "Sush123"
    }).expect(200);
    console.log(response.body);

    const user = await User.findById(userOneId);
    console.log(user);
    expect(response.body.token).toBe(user.tokens[1].token)
  
});

test("should not login", async()=>{
    await request(app).post('/user/login').send({
        "email" : "mohanai.sumanth@gmail.com",
        "password" : "Sush123"
    }).expect(400);
});

test('get details using auth', async()=>{
    await request(app)
        .get('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test('Fail to get details - no auth', async ()=>{
    await request(app)
        .get('/users/me')
        .send()
        .expect(401);
});

test('delete accout for auth users', async ()=>{
    await request(app)
    .delete('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

    const user = await User.findById(userOneId);
    expect(user).toBeNull();
});

test('delete accout for un-auth users', async ()=>{
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401);
});