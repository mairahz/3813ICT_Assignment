var fs = require('fs');
var path = require('path');
let file = path.join(__dirname, 'users.json');

class User {
    valid = false;
    users = [];
    user;


    constructor(username, upwd) {
        this.username = username;
        this.upwd = upwd;
    }

    check() {
        this.users = JSON.parse(fs.readFileSync(file).toString());
        for(let i = 0; i<this.users.length; i++){
            if(this.users[i].username == this.username && this.users[i].password == this.upwd) {
                this.valid = true;
                this.user = this.users[i];
                break;
            }
        }

        if(this.valid == true && this.user.group == true){
            return {user: this.user, valid: this.valid, usersList: this.users};
        } else if(this.valid == true && this.user.group == false) {
            return {user: this.user, valid: this.valid}
        } else {
            return({error: "error", valid: this.valid});
        }
    }

    add(user) {
        fs.writeFile(file, user, function(err) { 
            if(err){
                console.log(err);
            } else {
                console.log('done');
            }
        });
    }
}

module.exports = User