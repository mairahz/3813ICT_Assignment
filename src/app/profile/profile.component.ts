import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username = "";
  email = "";
  valid="";
  editmode=false;

  constructor(private router: Router) {
    this.valid = localStorage.getItem("valid");
    if(this.valid != "true"){
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {
    this.username = localStorage.getItem("username");
    this.email = localStorage.getItem("email");
  } 

  onClickEdit(){
    this.editmode = true;
  };

  onClickCancel(){
    this.username = localStorage.getItem("username");
    this.email = localStorage.getItem("email");
    this.editmode = false;
  }

  saveChanges(){
    localStorage.setItem("username", this.username);
    localStorage.setItem("email", this.email);
    this.editmode = false;
  };

}
