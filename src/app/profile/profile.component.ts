// import { Component, OnInit } from '@angular/core';
// import { Router } from "@angular/router";

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css']
// })
// export class ProfileComponent implements OnInit {
//   user; // Current user
//   valid; // Current validity of user

//   username = "";
//   email = "";
//   editmode = false; // Check if page is in edit mode.

//   constructor(private router: Router) {
//     this.valid = JSON.parse(localStorage.getItem("valid"));
//     if(!this.valid){
//       this.router.navigate(['login']);
//     }
//   }

//   ngOnInit() {
//     this.user = JSON.parse(localStorage.getItem("user"));
//   } 

//   /**
//    * Toggle to turn on edit mode.
//    */
//   onClickEdit(){
//     this.editmode = true;
//   };

//   /**
//    * When cancel is pressed, sets the local storage back to previous data.
//    */
//   onClickCancel(){
//     this.username = localStorage.getItem("username");
//     this.email = localStorage.getItem("email");
//     this.editmode = false;
//   }

//   /**
//    * Saves data to local storage.
//    */
//   saveChanges(){
//     this.user.username = this.username;
//     this.user.email = this.email;
//     localStorage.setItem("user", this.user);
//     this.editmode = false;
//   };

// }
