const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const sockets = require('./socket.js');
const server = require('./listen.js');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

// Define port used for server
const PORT = 3000;

// Apply express middleware
app.use(cors());
app.use(bodyParser.json());

// Setup socket
sockets.connect(io, PORT);

// Start server listening for requests
server.listen(http, PORT);

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const url = 'mongodb://localhost:27017';
MongoClient.connect(url, {poolSize:10, useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
  if(err) {return console.log(err)}
  
  const dbName = 'Chat';
  const db = client.db(dbName);
  const collection = db.collection('user');
    // collection.insertOne({username: "super", password: "super", super: true, admin: true, groupList:[]}, function(err, result){
    //     console.log(result);
    // });
    require('./routes/login.js')(db, app);
//   require('./routes/addUsr.js/')(db, app);
//   require('./routes/read.js')(db, app);
//   require('./routes/count.js')(db, app);
//   require('./routes/valid.js')(db, app);
//   require('./routes/remove.js')(db, app, ObjectID);
//   require('./routes/update.js')(db, app, ObjectID);
  // Start server listening for requests
//   server.listen(http, PORT);
});

