module.exports = function(db, app){
    // Route to get list of all items from the database.
    app.post('/api/read', function(req, res){
      if (!req.body){
        return res.sendStatus(400);
      }
      user = req.body;
      const collection = db.collection('group');
      collection.find({name: {$in: user.groupList}}).toArray((err, data) => {
          if(err == null){
              res.send(data);
          } else {
              res.send({'error': 'Error to get data'});
          }
      });
    });
}