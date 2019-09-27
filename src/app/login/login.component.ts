import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../services/user.service';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "";
  upwd = "";
  user;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  /**
   * Submits the new user form to the service.
   */
  itemSubmit() {
    this.user = new User(this.username, this.upwd);
    this.userService.login(this.user).subscribe((data) => {
      if (data.err == "No user"){
        alert("Invalid credentials. Please try again");
      } else {
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('valid', JSON.stringify({valid: true}));
      }
    })
  };

}
