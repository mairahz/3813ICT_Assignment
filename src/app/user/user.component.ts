import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  valid: string = "";

  constructor(private router: Router) {
    this.valid = sessionStorage.getItem("valid");
    if(this.valid != "true"){
      this.router.navigate(['login']);
    }
   }

  ngOnInit() {
  }

}
