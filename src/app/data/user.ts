import { Group } from './group';

export class User {
  username: string;
  pass: string;
  super: boolean;
  group: boolean;
  groupList: String[];

  constructor(username, pass) {
    this.username = username;
    this.pass = pass;
    this.super = false;
    this.group = false;
    this.groupList = [];
  }
}
