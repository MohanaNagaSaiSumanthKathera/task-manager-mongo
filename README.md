# task-manager-mongo
A Backend application created using nodejs,Expressjs,jest with mongoose package to connect with mongoDB.


**********************************
Deployed on heroku::

url::https://sumanth-task-manager.herokuapp.com/

Please find the Task-manager.postman_collection and delete it from project.



******************************
Needed installers::

sendgrid account - https://signup.sendgrid.com/
nodejs - https://nodejs.org/en/
mongodb - https://www.mongodb.com/download-center/community 
robo3t - https://robomongo.org/download
(or)
mongoDB Compass -https://www.mongodb.com/download-center/compass

Mongodb setup --> extract zip to D: drive --> create folder - mongodb-data (total 2 folders in D drive)
cmd::: /mongodb/bin/mongod.exe --dbpath=/mongodb-data  --> opens the connection pool to connect with robo3t or mongoDB compass.


****************************
steps to follow::

1. git clone https://github.com/MohanaNagaSaiSumanthKathera/task-manager-mongo.git
2. cd task-manager-mongo
3. npm install
4. create a folder config and place two files "dev.env" & "test.env"

dev.env:::::::
PORT=3000
SENDGRID_API_KEY= "value" ---> create account in sendgrid to send emails and replace the value with apiKey
MONGODB_URL=mongodb://127.0.0.1:27017/task-manager-api
JWT_SECRET='secret'

test.env::::::
PORT=3000
SENDGRID_API_KEY= "value" ---> create account in sendgrid to send emails and replace the value with apiKey
MONGODB_URL=mongodb://127.0.0.1:27017/task-manager-api-test
JWT_SECRET='secret'

5. npm run dev --> to inject env variables and start nodemon server.


************************************
Postman Collection usage::

1. create a user using "post /users", It will automatically set the authorization header for you"
2. Login to user "post /user/login".
3. get profile data using "get /users/me"
4. update profile data using "patch /users/me"
5. Post profile picture using "post /users/me/avatar"
6. get the pro pic using "get /users/5db7506a55c0b50017f81dad/avatar"
7. Delete profile picture using "delete /users/me/avatar"
8. create tasks specific to user using "post /users/me/avatar"
9. get multiple tasks using sorting & pagination "get /tasks?limit=3&sortBy=createdAt:asc"
10. get task by id "get /tasks/5db752e355c0b50017f81db0"
11. update task using "patch /tasks/5db752e355c0b50017f81db0"
12. Delete task using "delete /tasks/5db752e355c0b50017f81db0"
13. Logout user using "post /user/logout"
14. Logout from all sessions "post /user/logoutAll"
15. To delete user, first login then use "delete /users/me" to cascade delete all task and finally user.
