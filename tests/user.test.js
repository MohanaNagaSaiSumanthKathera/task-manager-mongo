const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const {userOne,userOneId,setUpDatabase} = require('../tests/fixtures/db');

beforeEach(setUpDatabase);

test('Should signup a new user', async()=>{
   const response= await request(app).post('/users').send({
            "age": 20,
            "name": "Sushma",
            "email": "Sushmaishere4u@gmail.com",
            "password": "Sush123"
    }).expect(201);
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

    const user = await User.findById(userOneId);
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

test('should uplaod avatar image', async ()=>{
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .attach('upload','tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test('should update valid test fields',async ()=>{
    const response= await request(app)
        .patch('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            name : "Sush"
        }).expect(200);
    
    const user = await User.findById(userOneId);
    expect(user.name).toBe(response.body.name);

})

test('should not update invalid fields test',async ()=>{
    const response= await request(app)
        .patch('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            location : "Sush"
        }).expect(404);
    
});
