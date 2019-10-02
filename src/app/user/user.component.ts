import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { RouteService } from '../services/route.service';
import { User } from '../data/user'


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  new: boolean = false; // Toggle for new user form
  // users: Array<any> = []; 
  user; // Current user
  users: User[]; // List of users
  valid: boolean = false; // Checks if user has logged in.

  // Data binding from form input fields.
  username: string = "";
  email: string = "";
  upwd: string = "";
  super: boolean = false;
  group: boolean = false;
  newUsr; // Details of new user object

  constructor(private router: Router, private service: RouteService) {
    this.valid = JSON.parse(localStorage.getItem("valid"));
    if(!this.valid){
      this.router.navigate(['login']);
    }
   }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.service.readUsr().subscribe((data) => {
      this.users = data;
    });
    // this.users = JSON.parse(localStorage.getItem("users"));
    // this.new = false;
  }

  /**
   * Toggle to show new user form.
   */
  // private onClickUser() {
  //   this.new = true;
  // }

  /**
   * Function that clears input form fields and sets new to false.
   */
  private onClickCancel(){
    this.username = "";
    this.email = "";
    this.upwd = "";
    this.super = false;
    this.group = false;
    this.new = false;
  }

  /**
   * Function that checks if the name is unique.
   * Returns true if username is not used.
   * Returns false if username is used.
   * @param name - username that was entered in form.
   */
  private checkName(name) {
    let unique: boolean = true;
    for(let i=0; i<this.users.length; i++){
      if(name == this.users[i].username){
        unique = false;
      }
    }
    return unique;
  }

  /**
   * Function that is called when the create button is clicked.
   * Checks that the neccesary form fields are not empty.
   * Check that username is unique.
   * 
   */
  private userCreate(){
    // if(!this.username){
    //   alert("Please enter a username.")
    // } else if(!this.email){
    //   alert("Please enter an email address.")
    // } else if(!this.upwd){
    //   alert("Please enter a password.")
    // } else {
    //   if(this.checkName(this.username)){
    //     if(this.super){
    //       this.group = true;
    //     }
    //     this.newUsr = {username: this.username, email: this.email, password: this.upwd, super: this.super, group: this.group, groupList:[], adminGroupList:[]}
    //     this.users.push(this.newUsr);
    //     localStorage.setItem("users", JSON.stringify(this.users));
    //     this.service.sendData(this.users);
    //     alert("User has been created.")
    //     this.onClickCancel();
    //   } else {
    //     alert("Sorry, this username is taken. Please try a new one.")
    //   }
    // }
  }

  /**
   * Deletes a user from the users list.
   * @param username - Name of the user to be deleted.
   */
  private userDelete(username){
    // for(let i=0; i<= this.users.length; i++){
    //   if(this.users[i].username == username){
    //     this.users.splice(i, 1);
    //     break;
    //   }
    // }
    // localStorage.setItem("users", JSON.stringify(this.users));
    // this.service.sendData(this.users);
  }

  /**
   * Makes a user an admin.
   * @param usr -User to be made admin
   */
  private makeAdmin(usr){
    // usr.group = true;
    // this.service.changeUserDetail(usr);
  }

}
