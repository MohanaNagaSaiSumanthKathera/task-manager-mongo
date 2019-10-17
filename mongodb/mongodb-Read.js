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

//*********Reading documents from mongo*********

    // db.collection('users').findOne({ _id : new ObjectID("5da6e6ca3b80932ec8fd8dcf"), name:"sushma" },(error,result)=>{
    //     if(error){
    //         return console.log('unable to fetch records',error);
    //     }
    //     console.log(result);
    // });
    

    //findall has no callback & it returns a cursor (expecting no need to retrieve all docs)

    db.collection('tasks').find({ completed : false}).toArray((error,result)=>{
        if(error){
            return  console.log('unable to retrieve');
        }
        console.log(result);

    })


    client.close();
});