export class User {
  username: string;
  pass: string;
  super: boolean;
  admin: boolean;
  groupList: Array<string>;

  constructor( username, pass) {
    this.username = username;
    this.pass = pass;
    this.super = false;
    this.admin = false;
    this.groupList = [];
  }
}
