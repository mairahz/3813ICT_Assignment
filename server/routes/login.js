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
        console.log(result);
          // if(count == 0){
          //     //if no duplicate
          //     collection.insertOne(product, (err, dbres)=>{
          //         if (err) throw err;
          //         let num = dbres.insertedCount;
          //         // send back to client number of items inserted and no error message.
          //         res.send({'num':num, err:null});
          //     });
          // } else {
          //     // On error, send back error message.
          //     res.send({num:0, err:"duplicate item"});
          // }
      });
  });
}