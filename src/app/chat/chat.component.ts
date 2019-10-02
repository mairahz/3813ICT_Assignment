import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Router, ActivatedRoute } from "@angular/router";
import { RouteService } from '../services/route.service';
import { Channel } from '../data/channel';
import { Message } from '../data/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messagecontent: string = "";
  messages: Message[] = [];
  system: string[] = [];
  ioConnection:any;
  valid: string = "";
  groupName: string;
  channelName: string;
  channel: Channel;
  user;
  users;

  constructor(private socketService:SocketService, private router: Router, private route: ActivatedRoute, private service: RouteService) {
    this.valid = JSON.parse(localStorage.getItem("valid"));
    if(!this.valid){
      this.router.navigate(['login']);
    }
    this.groupName = this.route.snapshot.params['group'];
    this.channelName = this.route.snapshot.params['channel'];
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  ngOnInit() {
    this.initIoConnection();
    this.service.readCh({name: this.channelName}).subscribe((data) => {
      this.users = data.ch.members;
      this.channel = data.ch;
    });
    // this.ChannelSort();
  }

  /**
   * Function for sending the messages to the server.
   */
  private initIoConnection(){
    this.socketService.initSocket(this.channelName);
    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        console.log(message)
        // Add new message to the messages array
        this.messages.push(message);
      });
    this.socketService.onJoin().subscribe((data:string) => {
      this.system.push(data);
    })
  }

  /**
   * Function for when the message is to be sent.
   */
  private chat(){
    if(this.messagecontent){
      // Check there is a message to send
      var msg = new Message(this.user.username, this.messagecontent);
      this.socketService.send(msg);
      this.messagecontent = null;
    } else {
      console.log("No message");
    }
  }

  /**
   * Removes the selected user from the channel.
   * @param usr - User to be removed
   */
  private rmvUser(usr){
    if(confirm("Are you sure you want to delete this item?")){
      for(let i=0; i<=this.channel.members.length; i++){
        if(this.channel.members[i].username == usr.username){
          this.channel.members.splice(i, 1);
          this.service.updateCh(this.channel).subscribe((data) => {
            alert("User removed from channel");
          });
          break;
        }
      }
    }
  }
  
}
