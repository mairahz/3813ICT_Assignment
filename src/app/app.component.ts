import { Component, OnInit } from '@angular/core';
import { User } from './data/user';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Assignment';
  valid = false;
  public user: any = {};

  public constructor(private data: DataService){
    // this.service.login(this.user).subscribe((data) => {
    //   console.log(data)
    // });
    this.data.currentValid.subscribe(valid => this.valid = valid)
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

  onUserValid(user: User){
    console.log(user);
  }

  onClickLogout(){
    localStorage.clear();
    this.valid = false;
  }
}
