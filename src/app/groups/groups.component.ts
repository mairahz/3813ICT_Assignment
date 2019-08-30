import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups: string[] = [];
  adminGroups: string[] = [];
  newGroup: boolean = false;
  name: string = "";
  user;
  users;
  selectedGroup: string = "";
  valid: string = "";
  

  constructor(private router: Router, private service: UserService) {
    this.valid = localStorage.getItem("valid");
    if(this.valid != "true"){
      this.router.navigate(['login']);
    }
    this.user = JSON.parse(localStorage.getItem("user"));
    this.users = JSON.parse(localStorage.getItem("users"));
    this.groups = this.user.groupList;
    this.adminGroups = JSON.parse(localStorage.getItem("adminGroupList"));
    console.log(this.groups)
   }

  ngOnInit() {
  }

  private onClickGroup(){
    if(!this.newGroup){
      this.newGroup = true;
    } else {
      this.newGroup = false;
    }
  }

  private groupSubmit(){
    if(this.name){
      this.user.groupList.push(this.name);
      this.user.adminGroupList.push(this.name);
      this.groups = this.user.groupList;
      localStorage.setItem("user", JSON.stringify(this.user));
      for(let i=0; i<=this.users.length; i++){
        if(this.user.username == this.users[i].username){
          this.users[i] = this.user;
          break;
        }
      }
      localStorage.setItem("users", JSON.stringify(this.users));
      this.service.sendData(this.users);
      this.newGroup = false;
      this.name = "";
    } else {
      alert("Please enter a group name.");
    }
  }

  private groupDelete(group: string){
    for(let i=0; i<= this.users.length; i++){
      if(this.users[i].username == this.user.username){
        for(let j=0; j<=this.user.groupList.length; j++){
          if(this.user.groupList[j] == group){
            this.user.groupList.splice(j, 1);
            for(let k=0; k<=this.user.adminGroupList.length; k++){
              if(this.user.adminGroupList[k] == group){
                this.user.adminGroupList.splice(k, 1)
                break;
              }
            }
            break;
          }
        }
        localStorage.setItem("user", JSON.stringify(this.user));
        this.users[i] = this.user;
        break;
      }
    }
    console.log(this.user)
    localStorage.setItem("users", JSON.stringify(this.users));
    this.service.sendData(this.users);
  }

}
