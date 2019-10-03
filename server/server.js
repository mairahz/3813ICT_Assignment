const express = require('express');
var formidable = require('formidable');
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
app.use(express.static(__dirname +'/uploads'))

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

app.post('/api/image', function (req, res){ // endpoint for root level of the site with a POST request
  var form = new formidable.IncomingForm();
  form.parse(req);
  form.on('fileBegin', function (name, file){ //when a fileBegin event is triggered use callback
    file.path = __dirname + '/uploads/' + file.name; // need to create directory "/uploads" 
  });
  form.on('file', function (name, file){ // when a file has been received console.log('Uploaded ' + file.name);
    res.send({ok: file.path});
  });
});

const url = 'mongodb://localhost:27017';
MongoClient.connect(url, {poolSize:10, useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
  if(err) {return console.log(err)}
  
  const dbName = 'Chat';
  const db = client.db(dbName);
  // db.collection('group').drop();
  // const collection = db.collection('user');
  //   collection.insertOne({username: "super", password: "super", super: true, group: true, groupList:[]}, function(err, result){
  //       console.log(result);
  //   });
  require('./routes/login.js')(db, app);
  require('./routes/addGrp.js')(db, app, ObjectID);
  require('./routes/addCh.js')(db, app, ObjectID);
  require('./routes/addUsr.js')(db, app);
  require('./routes/addMsg.js')(db, app, ObjectID);
  require('./routes/read.js')(db, app);
  require('./routes/readUsr.js')(db, app);
  require('./routes/readImg.js')(db, app);
  require('./routes/readGrp.js')(db, app);
  require('./routes/readCh.js')(db, app);
  require('./routes/deleteGrp.js')(db, app, ObjectID);
  require('./routes/deleteCh.js')(db, app, ObjectID);
  require('./routes/deleteUsr.js')(db, app, ObjectID);
  require('./routes/updateUsr.js')(db, app, ObjectID);
  require('./routes/updateGrp.js')(db, app, ObjectID);
  require('./routes/updateCh.js')(db, app, ObjectID);
//   require('./routes/count.js')(db, app);
//   require('./routes/valid.js')(db, app);
//   require('./routes/remove.js')(db, app, ObjectID);
//   require('./routes/update.js')(db, app, ObjectID);
  // Start server listening for requests
//   server.listen(http, PORT);
});

