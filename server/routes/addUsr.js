module.exports = function(db, app){
  // Route to manage adding a User
  app.post('/api/addUsr', function(req, res){
      if (!req.body){
          return res.sendStatus(400);
      }
      user = req.body;
      const collection = db.collection('user');
      // check for duplicate username
      collection.find({'username': user.username}).count((err, count) => {
          if(count == 0){
              //if no duplicate
              collection.insertOne(user, (err, dbres)=>{
                  if (err) throw err;
                  // send back to client list of users and no error message.
                  collection.find({}).toArray((err, result) => {
                      if (err) throw err;
                      res.send({users:result, err: null});
                  })
              });
          } else {
              // On error, send back error message.
              res.send({num:0, err:"duplicate item"});
          }
      });
  });
}