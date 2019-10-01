module.exports = function(db, app, ObjectID){
  // Route to add a group
  app.post('/api/addGrp', function(req, res){
      if(!req.body){
          return res.sendStatus(400);
      }
      user = req.body.user;
      group = req.body.group;
      var objectid = new ObjectID(user._id);
      const users = db.collection('user');
      const groups = db.collection('group');

      users.updateOne({_id:objectid},{$set: {groupList: user.groupList}}, ()=>{
        groups.insertOne(group, (err, dbres) => {
          if (err) throw err;
          groups.find({name: {$in: user.groupList}}).toArray((err, data)=>{
            if (err) throw err;
            res.send(data);
          });
        });
      });
  });
}