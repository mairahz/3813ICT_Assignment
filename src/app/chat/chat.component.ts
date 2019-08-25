import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messagecontent: string = "";
  messages: string[] = [];
  ioConnection:any;
  valid: string = "";

  constructor(private socketService:SocketService, private router: Router) {
    this.valid = sessionStorage.getItem("valid");
    if(this.valid != "true"){
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {
    this.initIoConnection();
  }

  private initIoConnection(){
    this.socketService.initSocket();
    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: string) => {
        // Add new message to the messages array
        this.messages.push(message);
      });
  }

  private chat(){
    if(this.messagecontent){
      // Check there is a message to send
      this.socketService.send(this.messagecontent);
      this.messagecontent = null;
    } else {
      console.log("No message");
    }
  }
  
}
