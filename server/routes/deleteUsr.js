module.exports = function(db, app, ObjectID){
  // Route to delete a user.
  app.post('/api/deleteUsr', function(req, res){
    if(!req.body){
        return res.sendStatus(400);
    }
    user = req.body;
    // Create a new mongo Object ID from the passed in _id.
    var objectid = new ObjectID(user._id);
    const users = db.collection('user');

    users.deleteOne({_id:objectid}, () => {
      users.find({}).toArray((err, data) => {
        if (err) throw err;
        res.send(data);
      });
    });      
  });
}