const {MongoClient,ObjectID}= require('mongodb');

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(connectionURL,(error,client)=>{
    if(error){
        return console.log("unable to establish connection");
    }
    const db = client.db(databaseName);
    console.log("connection established!..");

    //if callback is not passed then promise is executed
    // const updatePromise = db.collection('users').updateOne(
    //     {
    //         _id:new ObjectID("5da6e6ca3b80932ec8fd8dcf")
    //     },{
    //         $set :{
    //             name : 'chuchu koona',
    //             age :20
    //         }
    //     });

    // updatePromise.then((r)=>{
    //     console.log(r);
    // }).catch((e)=>{
    //     console.log(e);
    // });

    db.collection('tasks').updateMany({
        completed : false
    },{
        $set :{
            completed : true
        }
    }).then((r)=>{
        console.log(r);
    }).catch((e)=>{
        console.log(e);
    });
    


    client.close();
})