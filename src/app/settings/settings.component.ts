import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteService } from '../services/route.service';
import { User } from '../data/user';
import { Group } from '../data/group';
 
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  groupName: string = "";
  group: Group;
  users: User[];
  user: User;
  valid: boolean;
  channels = []; // channels in the group
  notInGroup = []; // users that are not in the group
  inGroup = []; // users that are in the group
  admins = []; // admins of the group
  assis = [];

  constructor(private route:ActivatedRoute, private router: Router, private service: RouteService) { 
    this.valid = JSON.parse(localStorage.getItem("valid"));
    if(!this.valid){
      this.router.navigate(['login']);
    }
    this.user = JSON.parse(localStorage.getItem("user"));
    this.groupName = this.route.snapshot.params['group'];
  }

  ngOnInit() {
    this.service.readGrp({name:this.groupName}).subscribe((data) => {
      this.group = data.group;
      this.inGroup = this.group.members;
      this.notInGroup = data.not;
    });
  }

  /**
   * Function for when the add user to group button is pressed.
   * @param usr -user to be added
   */
  onAdd(usr){
    usr.groupList.push(this.groupName);
    this.service.updateUsr(usr).subscribe(() => {
      this.group.members.push(usr);
      this.service.updateGrp(this.group).subscribe((data) => {
        this.group = data.group;
        this.inGroup = this.group.members;
        this.notInGroup = data.not;
      });
    });
  }

  /**
   * Function for when the remove user button is pressed.
   * @param usr - user to be removed
   */
  onRemove(usr){
    let i = usr.groupList.findIndex(group =>
      group.name == this.groupName);
    usr.groupList.splice(i, 1);
    this.service.updateUsr(usr).subscribe(() => {
      let j = this.group.members.findIndex(mem =>
        mem.username == usr.username);
      this.group.members.splice(j, 1);
      this.service.updateGrp(this.group).subscribe((data) => {
        this.group = data.group;
        this.inGroup = this.group.members;
        this.notInGroup = data.not;
      })
    })
    // this.service.changeUserDetail(usr);
    // this.notInGroup.push(usr);
    // let j = this.inGroup.findIndex(use =>
    //    usr.username == use.username);
    // this.inGroup.splice(j, 1);
  }

  /**
   * Function for when the user is to be added to a channel.
   * @param usr - user to be added to channel
   * @param channel - name of channel to add user to
   */
  onAddChannel(usr, channel){
    // let i = usr.groupList.findIndex( grp =>
    //   grp.name == this.groupName);
    // usr.groupList[i].channels.push(channel);
    // this.service.changeUserDetail(usr);
  }

  /**
   * Function that sorts the users into admins of the group and assis of the group
   */
  private adminSort(){
    // for(let i=0; i<this.users.length; i++){
    //   let k = this.users[i].adminGroupList.findIndex(grp =>
    //     grp.name == this.groupName);
    //   if(k != -1 && this.users[i].group){
    //     this.admins.push(this.users[i]);
    //   } else if(k != -1 && !this.users[i].group){
    //     this.assis.push(this.users[i]);
    //   }
    // }
  }

  /**
   * Function that makes a user to be an assis.
   * @param usr - User to be made an assis
   */
  private onAssis(usr){
  //   let i = this.user.adminGroupList.findIndex(grp =>
  //     grp.name == this.groupName);
  //   let j = usr.adminGroupList.findIndex(group =>
  //     group.name == this.groupName);
  //   if( j == -1){
  //     usr.adminGroupList.push(this.user.adminGroupList[i]);
  //   } else {
  //     usr.adminGroupList[j] = this.user.adminGroupList[i];
  //   }
  //   this.assis.push(usr);
  //   this.service.changeUserDetail(usr);
  }

  
}
