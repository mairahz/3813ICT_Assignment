module.exports = function(db, app){
  // Route to get list of all data of the group from the database.
  app.post('/api/readGrp', function(req, res){
    if(!req.body){
      return res.sendStatus(400);
    }
    groupName = req.body.name;
    const groups = db.collection('group');
    const users = db.collection('user');

    groups.find({name: groupName}).toArray((err, data) => {
      var group = data[0];
      users.find({groupList: {$nin: [groupName]}}).toArray((err, data) => {
        if(err == null){
          res.send({group: group, not: data});
        } else {
          res.send({'error': 'Error to get data'});
        }
      });
    });
  });
}