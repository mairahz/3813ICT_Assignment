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

  private channelSubmit(){
    for(let i=0; i<=this.user.groupList.length; i++){
      if(this.user.groupList[i].name == this.groupName){
        this.user.groupList[i].channels.push(this.name);
        for(let j=0; j<=this.user.adminGroupList.length; j++){
          if(this.user.adminGroupList[j].name == this.groupName){
            this.user.adminGroupList[i].channels.push(this.name);
            break;
          }
        }
        break;
      }
    }
    for(let i=0; i<=this.users.length; i++){
      if(this.users[i].username == this.user.username){
        localStorage.setItem("user", JSON.stringify(this.user));
        this.users[i] = this.user;
        break;
      }
    }
    localStorage.setItem("users", JSON.stringify(this.users));
    this.service.sendData(this.users);
    this.router.navigate(['']);
  }

}
