module.exports = function(db, app, ObjectID){
  // Route to delete a channel.
  app.post('/api/deleteCh', function(req, res){
      if(!req.body){
          return res.sendStatus(400);
      }
      group = req.body.group;
      ch = req.body.channel;
      user = req.body.user;
      // Create a new mongo Object ID from the passed in _id.
      var objectid = new ObjectID(group._id);
      const groups = db.collection('group');

      groups.updateOne({_id:objectid},{$pull: {channels: ch}}, () => {
        groups.find({name: {$in: user.groupList}}).toArray((err, data)=>{
          res.send(data);
      });
          
      });
  });
}