module.exports = function(db, app){
  // Route to manage adding a Group
  app.post('/api/addGrp', function(req, res){
      if (!req.body){
          return res.sendStatus(400);
      }
      group = req.body;
      const collection = db.collection('group');
      
      collection.insertOne(group, (err, dbres) => {
        if (err) throw err;
        let num = dbres.insertedCount;
        res.send({'num':num, err:null});
      });
  });
}