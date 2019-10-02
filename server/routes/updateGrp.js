module.exports = function(db, app, ObjectID){
  // Route to update a group.
  app.post('/api/updateGrp', function(req, res){
      if(!req.body){
          return res.sendStatus(400);
      }
      group = req.body;
      var objectid = new ObjectID(group._id);
      const collection = db.collection('group');
      const users = db.collection('user');

      collection.updateOne({_id:objectid},{$set: {channels: group.channels, members: group.members}}, ()=>{
          // Return a response to the client to let them know the update was successful.
          // res.send({'ok':user, err:null});
          collection.find({_id:objectid}).toArray((err, data) => {
            var grp = data[0];
            users.find({groupList: {$nin: [groupName]}}).toArray((err, data) => {
              if(err == null){
                res.send({group: grp, not: data});
              } else {
                res.send({'error': 'Error to get data'});
              }
            });
          })
      });
  });
}