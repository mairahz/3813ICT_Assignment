import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Router, ActivatedRoute } from "@angular/router";

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
  groupName: string;
  channelName: string;
  inChannel = [];
  notInChannel = [];
  user;
  users;

  constructor(private socketService:SocketService, private router: Router, private route: ActivatedRoute) {
    this.valid = JSON.parse(localStorage.getItem("valid"));
    if(!this.valid){
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {
    this.initIoConnection();
    this.groupName = this.route.snapshot.params['group'];
    this.channelName = this.route.snapshot.params['channel'];
    this.user = JSON.parse(localStorage.getItem("user"));
    this.users = JSON.parse(localStorage.getItem("users"));
    this.ChannelSort();
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

  private ChannelSort(){
    for(let i=0; i<this.users.length; i++){
      if(this.users[i].groupList.length != 0){
        let j = this.users[i].groupList.findIndex(grp =>
          grp.name == this.groupName);
        if( j != -1){
          let k = this.users[i].groupList[j].channels.findIndex(channel => 
            channel == this.channelName);
          if(k != -1)
          this.inChannel.push(this.users[i]);
        }
      }
      
    }
  }
  
}
