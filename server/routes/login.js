module.exports = function(db, app){
  // Route to manage logging in a user
  app.post('/api/login', function(req, res){
      if (!req.body){
          return res.sendStatus(400);
      }
      user = req.body;
      const collection = db.collection('user');
      // check for username
      collection.find({'username': user.username}).next((err, result) => {
        if (result == null){
          res.send({err:"No user"});
        } else {
          res.send({user: result, valid: true});
        }
      });
  });
}