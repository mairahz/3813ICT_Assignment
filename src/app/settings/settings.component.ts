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
    this.notInGroup = this.service.notInGroup(this.groupName);
  }

  onAdd(usr){
    usr.groupList.push({name: this.groupName, channels: []});
    this.service.changeUserDetail(usr);
    let i = this.notInGroup.findIndex(use =>
      use.name == usr.name);
    this.notInGroup.splice(i, 1);
    alert("User has been added to the group.")
  }
}
