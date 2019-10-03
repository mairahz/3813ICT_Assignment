import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user; // Current user
  valid; // Current validity of user

  username = "";
  email = "";
  path;
  editmode = false; // Check if page is in edit mode.

  constructor(private router: Router, private service: RouteService) {
    this.valid = JSON.parse(localStorage.getItem("valid"));
    if(!this.valid){
      this.router.navigate(['login']);
    }
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  ngOnInit() {
    this.path = this.user.path;
    console.log(this.path)
    // this.service.readImg({path:this.user.path}).subscribe((data) => {
    //   this.path = data;
    // });
  } 

  /**
   * Toggle to turn on edit mode.
   */
  onClickEdit(){
    this.editmode = true;
  };

  /**
   * When cancel is pressed, sets the local storage back to previous data.
   */
  onClickCancel(){
    this.username = localStorage.getItem("username");
    this.email = localStorage.getItem("email");
    this.editmode = false;
  }

  /**
   * Saves data to local storage.
   */
  saveChanges(){
    this.user.username = this.username;
    this.user.email = this.email;
    localStorage.setItem("user", this.user);
    this.editmode = false;
  };

}
