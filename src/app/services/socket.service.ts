import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { Message } from '../data/message';
const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;
  constructor() { }

  public initSocket(room): void {
    this.socket = io(SERVER_URL);
    this.socket.emit('create', room);
  }

  public send(message: Message): void {
    this.socket.emit('message', message);
  }

  public onJoin(): Observable<any> {
    let observable = new Observable(observer=>{
      this.socket.on('join', (data: Message) => observer.next(data));
    });
    return observable;
  }

  public onLeave(): Observable<any> {
    let observable = new Observable(observer=>{
      this.socket.on('disconnect', (data: Message) => observer.next(data));
    });
    return observable;
  }

  public onMessage(): Observable<any> {
    let observable = new Observable(observer=>{
      this.socket.on('message', (data:Message) => observer.next(data));
    });
    return observable;
  }
}
