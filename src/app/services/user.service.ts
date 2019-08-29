import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  sendData$: Observable<any>;
  private sendDataSubject = new Subject<any>();
  // public data: any;

  constructor(private http: HttpClient, private router: Router) { 
    this.sendData$ = this.sendDataSubject.asObservable();
  }

  sendData(data) {
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');

    this.http.post('http://localhost:3000/api/user', JSON.stringify(data), {
      headers: headers
    })
    .subscribe(data => {
      console.log(data);
      // this.data = data;
      // if(this.data.valid){
      //   this.router.navigate(['/user']);
      // } else {
      //   alert("Invalid User Credentials.");
      // }
      this.sendDataSubject.next(data);
    });
  }
}