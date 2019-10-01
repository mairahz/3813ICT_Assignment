module.exports = function(db, app){
  // Route to get list of all groups from the database.
  app.get('/api/read', function(req, res){
      const collection = db.collection('group');
      collection.find({}).toArray((err, data) => {
          if(err == null){
              res.send(data);
          } else {
              res.send({'error': 'Error to get data'});
          }
      });
  });
}