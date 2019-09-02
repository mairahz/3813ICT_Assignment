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
  }

  

  inGroup(groupName){
    this.users = JSON.parse(localStorage.getItem("users"));
    let inGroup =[];
    for(let i=0; i<this.users.length; i++){
      let j = this.users[i].groupList.findIndex(group =>
        groupName == group.name);
      if(j != -1){
        inGroup.push(this.users[i]);
      }
    }
    return(inGroup);
  }

  notInGroup(groupName){
    this.users = JSON.parse(localStorage.getItem("users"));
    let notInGroup =[];
    for(let i=0; i<this.users.length; i++){
      if(this.users[i].groupList.length == 0){
        notInGroup.push(this.users[i]);
      } else {
        let j = this.users[i].groupList.findIndex(group =>
          group.name == groupName);
        if(j == -1){
          notInGroup.push(this.users[i]);
        }
      }
    }
    return(notInGroup);
  }

  /**
   * Look for matching group name in all user list and deletes the group
   * @param group - group name to be deleted.
   */
  deleteGroup(group){
    this.users = JSON.parse(localStorage.getItem("users"));
    for(let i=0; i<this.users.length; i++){
      if(this.users[i].groupList.length == 0){
        break;
      }
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

  deleteChannel(group, channel){
    this.users = JSON.parse(localStorage.getItem("users"));
    // for(let i=0; i<=this.users.length; i++){
    //   if(this.users[i].groupList.length == 0){
    //     continue;
    //   } else {
    //     let l = this.users[i].groupList.findIndex(groupItem =>
    //       groupItem.name == group);
    //     for(let k=0; k<this.users[i].groupList[l].channels.length; k++){
    //       if(this.users[i].groupList[l].channels[k] == channel){
    //         this.users[i].groupList[l].channels.splice(k, 1);
    //         break;
    //       }
    //     }
    //     let j = this.users[i].adminGroupList.findIndex(groupItem =>
    //       groupItem.name == group);
    //     this.users[i].adminGroupList[j] = this.users[i].groupList[l];
    //   }
  
    // }
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
    localStorage.setItem("users", JSON.stringify(this.users));
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