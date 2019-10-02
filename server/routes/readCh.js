module.exports = function(db, app){
  // Route to get list of all data of the channel from the database.
  app.post('/api/readCh', function(req, res){
    if(!req.body){
      return res.sendStatus(400);
    }
    chName = req.body.name;
    const channels = db.collection('channel');

    channels.find({name: chName}).toArray((err, data) => {
      if(err == null){
        res.send({ch: data[0], err: null});
      } else {
        res.send({'error': 'Error to get data'});
      }
    });
  });
}