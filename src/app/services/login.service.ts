import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  sendData$: Observable<any>;
  private sendDataSubject = new Subject<any>();
  public data: any;

  constructor(private http: HttpClient, private router: Router) { 
    this.sendData$ = this.sendDataSubject.asObservable();
  }

  sendData(data) {
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');

    this.http.post('http://localhost:3000/login/api/login', JSON.stringify(data), {
      headers: headers
    })
    .subscribe(data => {
      this.data = data;
      if(this.data.valid){
        this.router.navigate(['']);
      } else {
        alert("User Credentials does not match.");
      }
      this.sendDataSubject.next(data);
    });
  }
}