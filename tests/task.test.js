const request = require('supertest');
const Task = require('../src/models/task');
const app = require('../src/app');
const {userOne,userOneId,setUpDatabase,taskThreeId} = require('../tests/fixtures/db');

beforeEach(setUpDatabase);

test('should create task for user',async()=>{
    const response = await request(app)
            .post('/tasks')
            .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
            .send({
                description: 'Chuchu is a cute girl'
            }).expect(201);
    
    const task = await Task.findById(response.body._id);
    expect(task.completed).toEqual(false);
});

test('Request all tasks for user one',async()=>{
    const response = await request(app)
        .get('/tasks')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
    
    expect(response.body.length).toBe(2);
})

test('delete another user task',async()=>{
    await request(app)
        .delete(`/tasks/${taskThreeId}`)
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(404);
    const task = await Task.findById(taskThreeId);
    expect(task).not.toBeNull();
})