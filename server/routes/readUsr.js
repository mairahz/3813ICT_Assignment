module.exports = function(db, app){
  // Route to get list of all items from the database.
  app.get('/api/readUsr', function(req, res){
    const collection = db.collection('user');
    collection.find({}).toArray((err, data) => {
        if(err == null){
            res.send(data);
        } else {
            res.send({'error': 'Error to get data'});
        }
    });
  });
}