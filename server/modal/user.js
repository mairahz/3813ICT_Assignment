class User {
    valid = false;
    user;
    obj = {
        users: [
            {username: "super", email: "super@com.au", password: "super"},
        ]
    }

    constructor(email, upwd) {
        this.email = email;
        this.upwd = upwd;
    }

    check() {
        for(let i = 0; i<this.obj.users.length; i++){
            if(this.obj.users[i].email == this.email && this.obj.users[i].password == this.upwd) {
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