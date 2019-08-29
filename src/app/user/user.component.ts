import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../services/user.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  valid: string = "";
  new: boolean = false;
  users: object[] = [];
  username: string = "";
  email: string = "";
  upwd: string = "";
  user: {};
  currName: string = "";

  constructor(private router: Router, private service: UserService) {
    this.valid = sessionStorage.getItem("valid");
    if(this.valid != "true"){
      this.router.navigate(['login']);
    }
    this.users = JSON.parse(sessionStorage.getItem("users"));
    
   }

  ngOnInit() {
    this.currName = sessionStorage.getItem("username");
  }

  private onClickUser() {
    this.new = true;
  }
  private userCreate(){
    this.user = {username: this.username, email: this.email, upwd: this.upwd}
    this.users.push(this.user);
    console.log(this.users);
    this.service.sendData(this.users);
    this.new = false;
  }

}
