import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../services/user.service';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups;
  adminGroups: string[] = [];
  newGroup: boolean = false;
  name: string = "";
  user;
  users;
  selectedGroup: string = "";
  valid: string = "";
  

  constructor(private router: Router, private service: UserService, private groupService: GroupService) {
    this.valid = localStorage.getItem("valid");
    if(this.valid != "true"){
      this.router.navigate(['login']);
    }
    this.groupService.getGroups()
      .subscribe((data) => this.groups = data);
    this.user = JSON.parse(localStorage.getItem("user"));
    this.users = JSON.parse(localStorage.getItem("users"));
    // this.groups = this.user.groupList;
    this.adminGroups = JSON.parse(localStorage.getItem("adminGroupList"));
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
      this.user.groupList.push({name: this.name, channels: [], users: [this.user.username]});
      this.user.adminGroupList.push({name: this.name, channels: [], users: [this.user.username]});
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
    //   if(this.users[i].username == this.user.username){
        for(let j=0; j<=this.user.groupList.length; j++){
          if(this.user.groupList[j].name == group){
            this.user.groupList.splice(j, 1);
            for(let k=0; k<=this.user.adminGroupList.length; k++){
              if(this.user.adminGroupList[k].name == group){
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
    //   }
    }
    localStorage.setItem("users", JSON.stringify(this.users));
    this.service.sendData(this.users);
  }

  private channelCreate(group){
    this.router.navigate(['channel', group]);
  }

  private channelDelete(channel, group){
    for(let i=0; i<=this.user.groupList.length; i++){
      if(group == this.user.groupList[i].name){
        for(let j=0; j<=this.user.groupList[i].channels.length; j++){
          if(channel == this.user.groupList[i].channels[j]){
            this.user.groupList[i].channels.splice(j, 1);
            break;
          }
        }
        break;
      }
    }
    
    for(let i=0; i<=this.users.length; i++){
      if(this.user.username == this.users[i].username){
        localStorage.setItem("user", JSON.stringify(this.user));
        this.users[i] = this.user;
        break;
      }
    }
    localStorage.setItem("users", JSON.stringify(this.users));
    this.service.sendData(this.users);
  }

  private onClickChannel(channel){
    this.router.navigate(['chat', channel]);
  }

}
