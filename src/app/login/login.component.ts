import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = "";
  upwd = "";
  public user = {};

  constructor(private service: LoginService) { }

  ngOnInit() {
  }

  itemSubmit() {
    this.user = { email: this.email, upwd: this.upwd};
    this.service.sendData(this.user);
  };

}
