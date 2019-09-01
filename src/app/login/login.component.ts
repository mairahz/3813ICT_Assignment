import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "";
  upwd = "";
  user = {username: "", upwd: ""};

  constructor(private service: LoginService) { }

  ngOnInit() {
  }

  itemSubmit() {
    this.user = { username: this.username, upwd: this.upwd};
    this.service.sendData(this.user);
  };

}
