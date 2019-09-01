var fs = require('fs');
var path = require('path');
let file = path.join(__dirname, 'groups.json');

class Group {

    constructor(name, user) {
        this.name = name;
        this.users.push(user);
    }

    add(group) {
        fs.writeFile(file, group, function(err) { 
            if(err){
                console.log(err);
            } else {
                console.log('done');
            }
        });
    }
}

module.exports = User