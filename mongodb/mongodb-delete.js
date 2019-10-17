const {MongoClient,ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017/';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL,(error,client)=>{
    if(error){
       return console.log(error,'unable to connect to database');
    }
    console.log('Connection established!..');

    //create a database by just passing name
    const db= client.db(databaseName);  

    //delete Operation

    db.collection('users').deleteMany({
        age:20
    }).then(r=>{
        console.log(r);
    }).catch(e=>{
        console.log(e);
    })

    client.close();
});