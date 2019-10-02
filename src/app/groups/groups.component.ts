import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { RouteService } from '../services/route.service';
import { User } from '../data/user';
import { Group } from '../data/group';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})

export class GroupsComponent implements OnInit {
  user: User; // Current user
  valid: boolean = false; 
  groups: String[] = [];
  group: Group; 
  name: string = "";

  constructor(private router: Router, private service: RouteService) {
    this.valid = JSON.parse(localStorage.getItem("valid"));
    if(!this.valid){
      this.router.navigate(['login']);
    }
   }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.service.read(this.user).subscribe((data) =>  {
      this.groups = data;
    });
  }

  /**
   * Function that submits the form that the user has filled in to create a new group.
   * Sends details to server.
   */
  private groupSubmit(){
    if(this.name){
      this.group = new Group(this.name);
      this.group.addMem(this.user);
      this.user.groupList.push(this.name);
      this.service.addGrp({user:this.user, group:this.group}).subscribe((data) => {
        if(data.err == null) {
          this.groups = data;
          alert("Created");
        }
      });
      this.name = "";
      localStorage.setItem("user", JSON.stringify(this.user));
    } else {
      alert("Please enter a group name.");
    }
  }

  /**
   * Deletes the group.
   * @param group - name of group to be deleted.
   */
  private groupDelete(id, name){
    if(confirm("Are you sure you want to delete this item?")){
      for(let i=0; i<=this.user.groupList.length; i++){
        if(name == this.user.groupList[i]){
          this.user.groupList.splice(i, 1);
          break;
        }
      }
  
      this.service.deleteGrp({user: this.user, groupid: id}).subscribe((data) => {
        this.groups = data;
      }); 
    }
    localStorage.setItem("user", JSON.stringify(this.user));
  }
  /**
   * Navigate to create channel page
   * @param group - Name of group
   */
  private channelCreate(group: string){
    console.log(group)
    this.router.navigate(['channel', group]);
  }

  /**
   * Delete channel
   * @param channel - Name of channel to be deleted
   * @param group - group name that the channel is in
   */
  private channelDelete(channel, group){
    this.service.deleteCh({channel: channel, group: group, user: this.user}).subscribe((data) => {
      this.groups = data;
    });
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
