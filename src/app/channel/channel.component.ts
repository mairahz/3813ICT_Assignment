import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  valid:string = "";
  name:string = "";
  groupName: string = "";
  user;
  users;

  constructor(private router: Router, private route:ActivatedRoute, private service:UserService) { 
    this.valid = localStorage.getItem("valid");
    if(this.valid != "true"){
      this.router.navigate(['login']);
    }
    this.user = JSON.parse(localStorage.getItem("user"));
    this.users = JSON.parse(localStorage.getItem("users"));
  }

  ngOnInit() {
    this.groupName = this.route.snapshot.params['group'];
  }

  /**
   * Function that creates a channel for a group.
   */
  private channelSubmit(){
    for(let i=0; i<=this.user.groupList.length; i++){
      if(this.user.groupList[i].name == this.groupName){
        this.user.groupList[i].channels.push(this.name);
        let k = this.user.adminGroupList.findIndex(grp =>
          grp.name == this.groupName);
          console.log(this.user.adminGroupList[k] )
        this.user.adminGroupList[k] = this.user.groupList[i];
        break;
      }
    }
    this.service.adminChannelAdd(this.name, this.groupName);
    localStorage.setItem("user", JSON.stringify(this.user));
    localStorage.setItem("users", JSON.stringify(this.users));
    this.service.sendData(this.users);
    this.router.navigate(['']);
  }

}
