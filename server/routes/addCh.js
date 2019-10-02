module.exports = function(db, app, ObjectID){
  // Route to add a channel
  app.post('/api/addCh', function(req, res){
    if(!req.body){
        return res.sendStatus(400);
    }
    group = req.body;
    const groups = db.collection('group');
    groups.find({name: group.group}).toArray((err, data) => {
      var objectid = new ObjectID(data[0]._id);
      groups.updateOne({_id:objectid}, {$push: {channels: group.channel}}, () => {
        groups.find({_id:objectid}).toArray((err, data) => {
          if (err) throw err;
          res.send({'ok': data, 'err': null});
        });
      });
    });
  });
}