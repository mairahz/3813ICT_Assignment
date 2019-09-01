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
        localStorage.setItem("user", JSON.stringify(user.user));
        localStorage.setItem("groupList", JSON.stringify(user.user.groupList));
        if(user.user.group){
          localStorage.setItem("adminGroupList", JSON.stringify(user.user.adminGroupList));
        }
        localStorage.setItem("users", JSON.stringify(user.usersList));
      }
    }
  };

  onClickLogout(){
    localStorage.clear();
    this.valid = false;
  }
}
