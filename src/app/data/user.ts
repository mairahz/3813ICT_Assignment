export class User {
  username: string;
  pass: string;
  email: string;
  path: string;
  super: boolean;
  group: boolean;
  groupList: String[];

  constructor(username, pass) {
    this.username = username;
    this.pass = pass;
    this.email = "";
    this.path = "";
    this.super = false;
    this.group = false;
    this.groupList = [];
  }

  public setEmail(mail: string){
    this.email = mail;
  }

  public setSuper(sup: boolean){
    this.super = sup;
  }

 public setGroup(grp: boolean){
   this.group = grp;
 }
 
 public addGroup(grp: String){
   this.groupList.push(grp);
 }
}