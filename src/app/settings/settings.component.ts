import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
 
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  groupName: string = "";
  users;
  user;
  valid;
  channels = []; // channels in the group
  notInGroup = []; // users that are not in the group
  inGroup = []; // users that are in the group

  constructor(private route:ActivatedRoute, private router: Router, private service: UserService) { 
    this.valid = JSON.parse(localStorage.getItem("valid"));
    if(!this.valid){
      this.router.navigate(['login']);
    }
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  ngOnInit() {
    this.groupName = this.route.snapshot.params['group'];
    this.users = JSON.parse(localStorage.getItem("users"));
    this.notInGroup = this.service.notInGroup(this.groupName);
    this.inGroup = this.service.inGroup(this.groupName);
    let i = this.user.adminGroupList.findIndex(grp =>
      grp.name == this.groupName);
    this.channels = this.user.adminGroupList[i].channels
  }

  onAdd(usr){
    usr.groupList.push({name: this.groupName, channels: []});
    this.service.changeUserDetail(usr);
    let i = this.notInGroup.findIndex(use =>
      use.name == usr.name);
    this.notInGroup.splice(i, 1);
    this.inGroup.push(usr);
    // alert("User has been added to the group.")
  }

  onRemove(usr){
    let i = usr.groupList.findIndex(group =>
      group.name == this.groupName);
    usr.groupList.splice(i, 1);
    this.service.changeUserDetail(usr);
    this.notInGroup.push(usr);
    let j = this.inGroup.findIndex(use =>
       usr.username == use.username);
    this.inGroup.splice(j, 1);
  }

  onAddChannel(usr, channel){
    let i = usr.groupList.findIndex( grp =>
      grp.name == this.groupName);
    usr.groupList[i].channels.push(channel);
    this.service.changeUserDetail(usr);
  }

  
}
