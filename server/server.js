const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const sockets = require('./socket.js');
const server = require('./listen.js');
const User = require('./modal/user.js')
const bodyParser = require('body-parser');

// Define port used for server
const PORT = 3000;

// Apply express middleware
app.use(cors());
app.use(bodyParser.json());

// Setup socket
sockets.connect(io, PORT);

// Start server listening for requests
server.listen(http, PORT);

app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });

app.post('/login/api/login', function(req, res){
    if (!req.body){
        return res.endStatus(400);
    }
    let user = new User(req.body.username, req.body.upwd);
    valid = JSON.stringify(user.check());
    res.send(valid);
});

app.post('/api/user', function(req, res){
    if (!req.body){
        return res.endStatus(400);
    }
    let user = new User();
    let data = JSON.stringify(req.body);
    user.add(data);
    res.send(data);
});

app.post('/api/group', function(req, res){
    if (!req.body){
        return res.endStatus(400);
    }
    console.log(req.body);
})