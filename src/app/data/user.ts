export class User {
  username: string;
  pass: string;
  super: boolean;
  group: boolean;
  groupList: Array<string>;

  constructor(username, pass) {
    this.username = username;
    this.pass = pass;
    this.super = false;
    this.group = false;
    this.groupList = [];
  }
}
