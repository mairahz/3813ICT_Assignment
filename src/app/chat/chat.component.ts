import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from '../services/user.service';

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

  constructor(private socketService:SocketService, private router: Router, private route: ActivatedRoute, private service: UserService) {
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

  /**
   * Function for sending the messages to the server.
   */
  private initIoConnection(){
    this.socketService.initSocket();
    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: string) => {
        // Add new message to the messages array
        this.messages.push(message);
      });
  }

  /**
   * Function for when the message is to be sent.
   */
  private chat(){
    if(this.messagecontent){
      // Check there is a message to send
      this.socketService.send(this.messagecontent);
      this.messagecontent = null;
    } else {
      console.log("No message");
    }
  }

  /**
   * Makes a list of users that are in the channel.
   */
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

  /**
   * Removes the selected user from the channel.
   * @param usr - User to be removed
   */
  private rmvUser(usr){
    let i = usr.groupList.findIndex(grp =>
      grp.name == this.groupName);
    let j = usr.groupList[i].channels.findIndex(channel =>
      channel == this.channelName);
    usr.groupList[i].channels.splice(j, 1);
    let k = this.inChannel.findIndex(user =>
      user.username == usr.username);
    this.inChannel.splice(k, 1);
    this.service.changeUserDetail(usr);
  }
  
}
