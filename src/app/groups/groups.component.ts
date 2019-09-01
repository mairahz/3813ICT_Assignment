import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  user; // Current user
  // users; // List of users
  valid: boolean = false; 

  newGroup: boolean = false;
  group = {}; 
  name: string = "";
  selectedGroup: string = "";
  

  constructor(private router: Router, private service: UserService) {
    this.valid = JSON.parse(localStorage.getItem("valid"));
    if(!this.valid){
      this.router.navigate(['login']);
    }
   }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    // this.users = JSON.parse(localStorage.getItem("users"));
    this.newGroup = false;
  }

  /**
  * Function that checks if a form for the new group is needed on the templete
  */
  private onClickGroup(){
    if(!this.newGroup){
      this.newGroup = true;
    } else {
      this.newGroup = false;
    }
  }

  /**
   * Function that submits the form that the user has filled in to create a new group.
   * Sends details to server.
   */
  private groupSubmit(){
    if(this.name){
      this.user.groupList.push({name: this.name, channels: []});
      this.user.adminGroupList.push({name: this.name, channels: []});

      localStorage.setItem("user", JSON.stringify(this.user));
      this.service.changeUserDetail(this.user);
      this.name = "";
      this.newGroup = false;
    } else {
      alert("Please enter a group name.");
    }
  }

  /**
   * Deletes the group.
   * @param group - name of group to be deleted.
   */
  private groupDelete(group: string){
    if(this.user.group){
      for(let i=0; i<=this.user.adminGroupList.length; i++){
        if(group == this.user.adminGroupList[i].name){
          this.user.adminGroupList.splice(i, 1);
          break;
        }
      }
    }

    for(let i=0; i<=this.user.groupList.length; i++){
      if(group == this.user.groupList[i].name){
        this.user.groupList.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("user", JSON.stringify(this.user));
    this.service.deleteGroup(group);
  }

  private channelCreate(group){
    this.router.navigate(['channel', group]);
  }

  // private channelDelete(channel, group){
  //   for(let i=0; i<=this.user.groupList.length; i++){
  //     if(group == this.user.groupList[i].name){
  //       for(let j=0; j<=this.user.groupList[i].channels.length; j++){
  //         if(channel == this.user.groupList[i].channels[j]){
  //           this.user.groupList[i].channels.splice(j, 1);
  //           break;
  //         }
  //       }
  //       break;
  //     }
  //   }
    
  //   for(let i=0; i<=this.users.length; i++){
  //     if(this.user.username == this.users[i].username){
  //       localStorage.setItem("user", JSON.stringify(this.user));
  //       this.users[i] = this.user;
  //       break;
  //     }
  //   }
  //   localStorage.setItem("users", JSON.stringify(this.users));
  //   this.service.sendData(this.users);
  // }

  // private onClickChannel(channel){
  //   this.router.navigate(['chat', channel]);
  // }

}
