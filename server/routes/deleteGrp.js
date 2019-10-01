module.exports = function(db, app, ObjectID){
    // Route to delete a group.
    app.post('/api/deleteGrp', function(req, res){
        if(!req.body){
            return res.sendStatus(400);
        }
        groupID = req.body.groupid;
        user = req.body.user;
        // Create a new mongo Object ID from the passed in _id.
        var objectid = new ObjectID(groupID);
        const groups = db.collection('group');
        const users = db.collection('user');

        users.updateOne({_id:objectid},{$set: {groupList: user.groupList}}, () => {
            // Delete a single item based on its unique ID.
            groups.deleteOne({_id:objectid}, (err, docs)=>{
                // get a new listing of all items in the database and return to client.
                groups.find({name: {$in: user.groupList}}).toArray((err, data)=>{
                    res.send(data);
                });
            });
        });
    });
}