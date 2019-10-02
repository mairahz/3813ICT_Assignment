module.exports = function(db, app, ObjectID){
  // Route to update a channel.
  app.post('/api/updateCh', function(req, res){
      if(!req.body){
          return res.sendStatus(400);
      }
      channel = req.body;
      var objectid = new ObjectID(channel._id);
      const channels = db.collection('channel');
      const users = db.collection('user');

      channels.updateOne({_id:objectid},{$set: {members: channel.members, messages: channel.messages}}, ()=>{
          // Return a response to the client to let them know the update was successful.
         res.send({ok: "Success", err: null})
      });
  });
}