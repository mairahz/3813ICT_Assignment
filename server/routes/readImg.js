module.exports = function(db, app){
  // Route to get list of all items from the database.
  app.get('/api/readImg', function(req, res){
    path = req.query.param;
    console.log(path)
    res.sendFile(path);
  });
}