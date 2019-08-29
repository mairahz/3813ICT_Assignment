import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Assignment';
  valid = false;
  public user: any = {};

  public constructor(private service: LoginService){
    this.service.sendData$.subscribe((data) => {
      if(data.valid){
        this.valid = true;
        this.user = data;
        this.addStorage(this.user);
        sessionStorage.setItem("valid", data.valid);
      } else {
        sessionStorage.setItem("valid", data.valid);
      } 
    });
  }

  ngOnInit(){}

  addStorage(user){
    if (typeof(Storage) !== "undefined") {
      if(user.valid){
        sessionStorage.setItem("username", user.user.username);
        sessionStorage.setItem("email", user.user.email);
        sessionStorage.setItem("super", user.user.super);
        sessionStorage.setItem("group", user.user.group);
        sessionStorage.setItem("users", JSON.stringify(user.usersList));
      }
    }
  };

  onClickLogout(){
    sessionStorage.clear();
    this.valid = false;
  }
}
