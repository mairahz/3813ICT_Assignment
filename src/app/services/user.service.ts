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
  users = JSON.parse(localStorage.getItem("users"));
  // public data: any;

  constructor(private http: HttpClient, private router: Router) { 
    this.sendData$ = this.sendDataSubject.asObservable();
    this.users = JSON.parse(localStorage.getItem("users"));
  }

  /**
   * Look for matching group name in all user list and deletes the group
   * @param group - group name to be deleted.
   */
  deleteGroup(group){
    for(let i=0; i<=this.users.length; i++){
      if(this.users[i].group){
        for(let j=0; j<=this.users[i].adminGroupList.length; j++){
          if(this.users[i].adminGroupList[j].name == group){
            this.users[i].adminGroupList.splice(j, 1);
            break;
          }
        }  
      }

      for(let j=0; j<=this.users[i].groupList.length; j++){
        if(this.users[i].groupList[j].name == group){
          this.users[i].groupList.splice(j, 1);
          break;
        }
      }
    }
    this.sendData(this.users);
  }

  /**
   * Looks for matching username in the user list. 
   * Changes details of that user.
   * @param user - user object to be changed
   */
  changeUserDetail(user){
    for(let i=0; i<=this.users.length; i++){
      if(user.username == this.users[i].username){
        this.users[i] = user;
        break;
      }
    }
    this.sendData(this.users);
  }

  /**
   *  Send user data to the server.
   * @param data - User details
   */
  sendData(data) {
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');

    this.http.post('http://localhost:3000/api/user', JSON.stringify(data), {
      headers: headers
    })
    .subscribe(data => {
      console.log('sendData ' + data);
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