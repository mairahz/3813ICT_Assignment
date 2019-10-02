module.exports = function(db, app, ObjectID){
  // Route to update a user.
  app.post('/api/updateUsr', function(req, res){
      if(!req.body){
          return res.sendStatus(400);
      }
      user = req.body;
      var objectid = new ObjectID(user._id);
      const collection = db.collection('user');

      collection.updateOne({_id:objectid},{$set: {super: user.super, group: user.group, groupList: user.groupList}}, ()=>{
          // Return a response to the client to let them know the update was successful.
          // res.send({'ok':user, err:null});
          collection.find({}).toArray((err, data) => {
            if(err) throw err;
            res.send(data);
          })
      });
  });
}