class User {
    valid = false;
    user;
    obj = {
        users: [
            {username: "super", email: "super@com.au", password: "super", type: ["SuperAdmin", "GroupAdmin"]},
        ]
    }

    constructor(username, upwd) {
        this.username = username;
        this.upwd = upwd;
    }

    check() {
        console.log(this.username);
        console.log(this.upwd)
        for(let i = 0; i<this.obj.users.length; i++){
            if(this.obj.users[i].username == this.username && this.obj.users[i].password == this.upwd) {
                this.valid = true
                this.user = this.obj.users[i];
                break;
           }
        }
       if(this.valid == true){
           return {user: this.user, valid: this.valid};
       } else {
           return({error: "error", valid: this.valid});
       }
    }
}

module.exports = User