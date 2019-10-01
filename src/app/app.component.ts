import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Assignment';
  valid = false;
  public user: any = {};

  public constructor(private service: UserService){
    this.service.login.subscribe((data) => {
      console.log(data)
    });
  }

  ngOnInit(){}

  // addStorage(user){
  //   if (typeof(Storage) !== "undefined") {
  //     if(user.valid){
  //       localStorage.setItem("user", JSON.stringify(user.user));
  //       localStorage.setItem("groupList", JSON.stringify(user.user.groupList));
  //       if(user.user.group){
  //         localStorage.setItem("adminGroupList", JSON.stringify(user.user.adminGroupList));
  //       }
  //       localStorage.setItem("users", JSON.stringify(user.usersList));
  //     }
  //   }
  // };

  onClickLogout(){
    localStorage.clear();
    this.valid = false;
  }
}
