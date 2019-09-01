import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class GroupService {
  sendData$: Observable<any>;
  private sendDataSubject = new Subject<any>();
  groupsURL = 'server/modal/groups.json';

  constructor(private http: HttpClient, private router: Router) { 
    this.sendData$ = this.sendDataSubject.asObservable();
  }

  getGroups(){
    return this.http.get("http://localhost:4200/");
  }

  sendData(data) {
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');

    this.http.post('http://localhost:3000/api/user', JSON.stringify(data), {
      headers: headers
    })
    .subscribe(data => {
      this.sendDataSubject.next(data);
    });
  }
}