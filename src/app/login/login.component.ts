import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../data/user';
import { RouteService } from '../services/route.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() public onUserValid: EventEmitter<User> = new EventEmitter<User>();

  username = "";
  upwd = "";
  user;

  constructor(private route: RouteService, private data: DataService, private router: Router) { }

  ngOnInit() {
  }

  /**
   * Submits the new user form to the service.
   */
  itemSubmit() {
    this.user = new User(this.username, this.upwd);
    this.route.login(this.user).subscribe((data) => {
      if (data.err == "No user"){
        alert("Invalid credentials. Please try again");
      } else {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('valid', JSON.stringify({valid: data.valid}));
        this.data.changeValid(true);
        this.router.navigate(['']);
      }
    })
  };

}
