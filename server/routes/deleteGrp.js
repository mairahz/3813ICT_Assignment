module.exports = function(db, app, ObjectID){
  // Route to delete a group.
  app.post('/api/deleteGrp', function(req, res){
      if(!req.body){
          return res.sendStatus(400);
      }
      groupID = req.body.groupid;
      // Create a new mongo Object ID from the passed in _id.
      var objectid = new ObjectID(groupID);
      const collection = db.collection('group');
      // Delete a single item based on its unique ID.
      collection.deleteOne({_id:objectid}, (err, docs)=>{
          // get a new listing of all items in the database and return to client.
          collection.find({}).toArray((err, data)=>{
              res.send(data);
          });
      });
  });
}