module.exports = function(db, app, ObjectID){
  // Route to add a Message
  app.post('/api/addMsg', function(req, res){
    if(!req.body){
        return res.sendStatus(400);
    }
    channel = req.body;
    const channels = db.collection('channel');
    var objectid = new ObjectID(channel._id);

    channels.updateOne({_id:objectid}, {$set: {messages: channel.messages}}, () => {
      res.send({err:null});
    });
  });
}