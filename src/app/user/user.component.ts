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
    this.valid = sessionStorage.getItem("valid");
    if(this.valid != "true"){
      this.router.navigate(['login']);
    }
    this.users = JSON.parse(sessionStorage.getItem("users"));
    this.currName = sessionStorage.getItem("username");
    
   }

  ngOnInit() {
    this.new = false;
  }

  private onClickUser() {
    this.new = true;
  }
  private userCreate(){
    this.user = {username: this.username, email: this.email, upwd: this.upwd, super: this.super, group: this.group}
    this.users.push(this.user);
    sessionStorage.setItem("users", JSON.stringify(this.users));
    this.service.sendData(this.users);
    this.username = "";
    this.email = "";
    this.upwd = "";
    this.super = false;
    this.group = false;
    this.new = false;
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
    this.new = false;
  }
}
