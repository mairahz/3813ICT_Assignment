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
        localStorage.setItem("valid", data.valid);
      } else {
        localStorage.setItem("valid", data.valid);
      } 
    });
  }

  ngOnInit(){}

  addStorage(user){
    if (typeof(Storage) !== "undefined") {
      if(user.valid){
        localStorage.setItem("username", user.user.username);
        localStorage.setItem("email", user.user.email);
        localStorage.setItem("super", user.user.super);
        localStorage.setItem("group", user.user.group);
        localStorage.setItem("users", JSON.stringify(user.usersList));
      }
    }
  };

  onClickLogout(){
    localStorage.clear();
    this.valid = false;
  }
}
