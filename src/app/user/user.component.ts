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
  user: {};
  currName: string = "";
  super: boolean = false;
  group: boolean = false;

  constructor(private router: Router, private service: UserService) {
    this.valid = localStorage.getItem("valid");
    if(this.valid != "true"){
      this.router.navigate(['login']);
    }
    this.users = JSON.parse(localStorage.getItem("users"));
    this.currName = localStorage.getItem("username");
    
   }

  ngOnInit() {
    this.new = false;
  }

  private onClickUser() {
    this.new = true;
  }
  private userCreate(){
    let unique = true;
    for(let i=0; i<this.users.length; i++){
      if(this.users[i].username == this.username){
        unique = false;
        break;
      }
    }
    if(unique){
      this.user = {username: this.username, email: this.email, upwd: this.upwd, super: this.super, group: this.group}
      this.users.push(this.user);
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

  private userDelete(username){
    for(let i=0; i<= this.users.length; i++){
      if(this.users[i].username == username){
        this.users.splice(i);
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
}
