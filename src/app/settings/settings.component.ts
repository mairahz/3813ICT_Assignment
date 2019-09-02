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
  notInGroup = []; // users that are not in the group

  constructor(private route:ActivatedRoute, private router: Router, private service: UserService) { 
    this.valid = JSON.parse(localStorage.getItem("valid"));
    if(!this.valid){
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {
    this.groupName = this.route.snapshot.params['group'];
    this.user = JSON.parse(localStorage.getItem("user"));
    this.users = JSON.parse(localStorage.getItem("users"));
    for(let i=0; i<this.users.length; i++){
      if(this.users[i].groupList.length == 0){
        console.log(this.user)
        this.notInGroup.push(this.users[i]);
      } else {
        let j = this.users[i].groupList.findIndex(group =>
          group.name == this.groupName);
        if(j == -1){
          this.notInGroup.push(this.users[i]);
        }
      }
      console.log(this.notInGroup) 
    }
  }

}
