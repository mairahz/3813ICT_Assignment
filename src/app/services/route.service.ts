import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../data/user';
import { Group } from '../data/group';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http: HttpClient) { }

  login(user: User){
    return this.http.post<any>('http://localhost:3000/api/login', user);
  }

  read(){
    return this.http.get<any>('http://localhost:3000/api/read');
  }

  addGrp(group: Group){
    return this.http.post<any>('http://localhost:3000/api/addGrp', group);
  }

  deleteGrp(groupID){
    return this.http.post<any>('http://localhost:3000/api/deleteGrp', {'groupid': groupID});
  }

  // dd(product:Product){
  //   return this.http.post<any>('http://localhost:3000/api/add', product);
  // }

  // read(){
  //   return this.http.get<any>('http://localhost:3000/api/read');
  // }

  // getItem(productID){
  //   return this.http.post<any>('http://localhost:3000/api/getItem', {'productid':productID});
  // }

  // update(product: Product){
  //   return this.http.post<any>('http://localhost:3000/api/update', product);
  // }

  // delete(productID){
  //   return this.http.post<any>('http://localhost:3000/api/delete', {'productid': productID});
  // }

  // checkvalidid(productID){
  //   return this.http.post<any>('http://localhost:3000/api/valid', {'id':productID});
  // }

  // getCount(){
  //   return this.http.get<any>('http://localhost:3000/api/count');
  // }
  
}
