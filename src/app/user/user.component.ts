import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../services/user.service';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  valid: string = "";
  new: boolean = false;
  users: Array<any> = [];
  username: string = "";
  email: string = "";
  upwd: string = "";
  user;
  newUsr: {};
  groups;
  currName: string = "";
  super: boolean = false;
  group: boolean = false;

  constructor(private router: Router, private service: UserService) {
    this.valid = localStorage.getItem("valid");
    if(this.valid != "true"){
      this.router.navigate(['login']);
    }
    this.users = JSON.parse(localStorage.getItem("users"));
    this.user = JSON.parse(localStorage.getItem("user"));
    this.currName = localStorage.getItem("username");
    this.groups = this.user.adminGroupList;
   }

  ngOnInit() {
    this.new = false;
  }

  private onClickUser() {
    this.new = true;
  }

  private userCreate(){
    if(!this.username){
      alert("Please enter a username.")
    } else if(!this.email){
      alert("Please enter an email address.")
    } else if(!this.upwd){
      alert("Please enter a password.")
    } else {
      let unique = true;
      for(let i=0; i<this.users.length; i++){
        if(this.users[i].username == this.username){
          unique = false;
          break;
        }
      }
      if(unique){
        if(this.super){
          this.group = true;
        }
        if(this.group){
          this.newUsr = {username: this.username, email: this.email, password: this.upwd, super: this.super, group: this.group, groupList:[]}
        } else {
          this.newUsr = {username: this.username, email: this.email, password: this.upwd, super: this.super, group: this.group, groupList:[], adminGroupList:[]}
        }
        this.users.push(this.newUsr);
        localStorage.setItem("users", JSON.stringify(this.users));
        this.service.sendData(this.users);
        this.username = "";
        this.email = "";
        this.upwd = "";
        this.super = false;
        this.group = false;
        this.new = false;
      } else {
        alert("Sorry, this username is taken. Please try a new one.")
      }
      
    }
  }

  private userDelete(username){
    for(let i=0; i<= this.users.length; i++){
      if(this.users[i].username == username){
        this.users.splice(i, 1);
        break;
      }
    }
    this.service.sendData(this.users);
  }

  private onClickCancel(){
    this.username = "";
    this.email = "";
    this.upwd = "";
    this.super = false;
    this.group = false;
    this.new = false;
  }

  private addGroup(group, user){
    for(let i=0; i<=this.users.length; i++){
      if(user == this.users[i].username){
        this.users[i].groupList.push(group);
        break;
      }
    }
    localStorage.setItem("users", JSON.stringify(this.users));
    this.service.sendData(this.users);
  }

}
