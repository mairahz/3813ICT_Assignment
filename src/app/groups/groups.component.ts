import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { RouteService } from '../services/route.service';
import { User } from '../user';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  user: User; // Current user
  // groupList; // Current User's Grouplist
  // adGroupList // Current User's Admin Grouplist
  users: [User]; // List of users
  valid: boolean = false; 

  newGroup: boolean = false;
  group = {}; 
  name: string = "";
  selectedGroup: string = "";
  

  constructor(private router: Router, private service: RouteService) {
    this.valid = JSON.parse(localStorage.getItem("valid"));
    if(!this.valid){
      this.router.navigate(['login']);
    }
   }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.newGroup = false;
    console.log(this.user);
  }

  /**
   * Function that submits the form that the user has filled in to create a new group.
   * Sends details to server.
   */
  private groupSubmit(){
    if(this.name){
      this.user.groupList.push(this.name);
      this.adGroupList.push({name: this.name, channels: []});

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
    // let i = this.adGroupList.findIndex(groupItem =>
    //   groupItem.name == group);
    // this.adGroupList.splice(i, 1);

    // i = this.groupList.findIndex(groupItem =>
    //   groupItem.name == group);
    // this.groupList.splice(i, 1);

    // localStorage.setItem("user", JSON.stringify(this.user));
    // this.service.deleteGroup(group);
  }
  /**
   * Navigate to change channel form.
   * @param group - Name of group
   */
  private channelCreate(group){
    this.router.navigate(['channel', group]);
  }

  /**
   * Delete channel
   * @param channel - Name of channel to be deleted
   * @param group - group name that the channel is in
   */
  private channelDelete(channel, group){
    // let i = this.groupList.findIndex(groupItem =>
    //   groupItem.name == group);
    // let k = this.groupList[i].channels.findIndex(chan =>
    //   chan == channel);
    // this.groupList[i].channels.splice(k, 1);

    // let j = this.adGroupList.findIndex(groupItem =>
    //   groupItem.name == group);
    // this.adGroupList[j] = this.groupList[i];
    
    // localStorage.setItem("user", JSON.stringify(this.user));
    // // this.service.deleteChannel(group, channel);
    // this.service.changeUserDetail(this.user);
  }

  /**
   * Navigate to chatroom of channel
   * @param channel - Name of channel to go to
   */
  private onClickChannel(group, channel){
    this.router.navigate(['chat', group, channel]);
  }

  private onClickSettings(group){
    this.router.navigate(['settings', group])
  }

}
