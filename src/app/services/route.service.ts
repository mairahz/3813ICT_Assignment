import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../data/user';
import { Group } from '../data/group';
import { Channel } from '../data/channel';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http: HttpClient) { }

  login(user: User){
    return this.http.post<any>('http://localhost:3000/api/login', user);
  }

  read(user: User){
    return this.http.post<any>('http://localhost:3000/api/read', user);
  }

  readUsr(){
    return this.http.get<any>('http://localhost:3000/api/readUsr');
  }

  // readImg(img){
  //   return this.http.post<any>('http://localhost:3000/api/readImg?param=', img);
  // }

  readGrp(name){
    return this.http.post<any>('http://localhost:3000/api/readGrp', name);
  }

  readCh(name){
    return this.http.post<any>('http://localhost:3000/api/readCh', name);
  }

  addUsr(user: User){
    return this.http.post<any>('http://localhost:3000/api/addUsr', user);
  }

  addGrp(user){
    return this.http.post<any>('http://localhost:3000/api/addGrp', user);
  }

  addCh(group){
    return this.http.post<any>('http://localhost:3000/api/addCh', group);
  }

  addMsg(channel: Channel){
    return this.http.post<any>('http://localhost:3000/api/addMsg', channel);
  }

  upFile(file){
    return this.http.post<any>('http://localhost:3000/api/image', file);
  }

  deleteUsr(user: User){
    return this.http.post<any>('http://localhost:3000/api/deleteUsr', user);
  }

  deleteGrp(object){
    return this.http.post<any>('http://localhost:3000/api/deleteGrp', object);
  }

  deleteCh(object){
    return this.http.post<any>('http://localhost:3000/api/deleteCh', object);
  }

  updateUsr(user: User){
    return this.http.post<any>('http://localhost:3000/api/updateUsr', user);
  }

  updateGrp(group: Group){
    return this.http.post<any>('http://localhost:3000/api/updateGrp', group);
  }

  updateCh(channel: Channel){
    return this.http.post<any>('http://localhost:3000/api/updateCh', channel);
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
