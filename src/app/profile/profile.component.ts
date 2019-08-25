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
    this.valid = sessionStorage.getItem("valid");
    console.log(this.valid);
    if(this.valid != "true"){
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {
    this.username = sessionStorage.getItem("username");
    this.email = sessionStorage.getItem("email");
  } 

  onClickEdit(){
    this.editmode = true;
  };

  onClickCancel(){
    this.username = sessionStorage.getItem("username");
    this.email = sessionStorage.getItem("email");
    this.editmode = false;
  }

  saveChanges(){
    sessionStorage.setItem("username", this.username);
    sessionStorage.setItem("email", this.email);
    this.editmode = false;
  };

}
