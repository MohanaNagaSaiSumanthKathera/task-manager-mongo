// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

//destructuring above 3 lines

const {MongoClient,ObjectID} = require('mongodb');

// const id = new ObjectID;
// console.log(id);
// console.log(id.id);
// console.log(id.toHexString());

const connectionURL = 'mongodb://127.0.0.1:27017/';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL,(error,client)=>{
    if(error){
       return console.log(error,'unable to connect to database');
    }
    console.log('Connection established!..');

    //create a database by just passing name
    const db= client.db(databaseName);

//********create operation********

    db.collection('users').insertOne({
        name : 'Bujji koona',
        age : 20
    },(error,result)=>{
        if(error){
            return console.log(error,'unable to insert document');
        }
        console.log(result.ops);
    });

    // db.collection('tasks').insertMany([
    //     {
    //         description : 'Clean the house',
    //         completed : true
    //     },{
    //         description : 'Fill water bottles',
    //         completed: false
    //     },{
    //         description : 'Warm the milk',
    //         completed : true
    //     }

    // ],(error,result)=>{
    //     if(error){
    //         return console.log(error,'unable to insert the document');
    //     }
    //     console.log(result.ops);
    // })

    client.close();
});
