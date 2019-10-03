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
  path: string = "";
  super: boolean = false;
  group: boolean = false;
  newUsr: User; // Details of new user object

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
  }

  /**
   * Function that clears input form fields.
   */
  private onClickCancel(){
    this.username = "";
    this.email = "";
    this.upwd = "";
    this.super = false;
    this.group = false;
  }

  /**
   * Function that checks if the name is unique.
   * Returns true if username is not used.
   * Returns false if username is used.
   * @param name - username that was entered in form.
   */
  // private checkName(name) {
  //   let unique: boolean = true;
  //   for(let i=0; i<this.users.length; i++){
  //     if(name == this.users[i].username){
  //       unique = false;
  //     }
  //   }
  //   return unique;
  // }

  /**
   * Function that is called when the create button is clicked.
   * Checks that the neccesary form fields are not empty.
   * Check that username is unique.
   * 
   */
  private userCreate(){

    if(!this.username){
      alert("Please enter a username.")
    } else if(!this.email){
      alert("Please enter an email address.")
    } else if(!this.upwd){
      alert("Please enter a password.")
    } else {
      this.newUsr = new User(this.username, this.upwd);
      if(this.super){
        this.group = true;
      }
      this.newUsr.path = this.path;
      this.newUsr.setEmail(this.email);
      this.newUsr.setSuper(this.super);
      this.newUsr.setGroup(this.group);
      this.service.addUsr(this.newUsr).subscribe((data) => {
        if(data.err != null){
          alert("Username taken. Please choose a different username.");
        } else {
          console.log(data);
          this.users = data.users;
          this.onClickCancel();
          alert("User Created");
        }
      });
    }
  }

  /**
   * Deletes a user from the users list.
   * @param usr - User to be deleted.
   */
  private userDelete(usr){
    if(confirm("Are you sure you want to delete " + usr.username + "?")){
      this.service.deleteUsr(usr).subscribe((data) => {
        this.users = data;
      });
    }
  }

  /**
   * Makes a user an admin.
   * @param usr -User to be made admin
   */
  private makeAdmin(usr){
    usr.group = true;
    this.service.updateUsr(usr).subscribe((data) => {
      if(data.err == null) {
        alert("Updated successfully");
        this.users = data;
      }
    })
  }

  /**
   * Process image
   * @param imageInput - file uploaded
   */
  processFile(imageInput: any){
    const file: File = imageInput.files[0];
    const form = new FormData();
    form.append('file', file, file.name);
    this.service.upFile(form).subscribe(
      (res) => {this.path = res.ok;}
    )
  }

}
