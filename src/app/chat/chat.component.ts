import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Router, ActivatedRoute } from "@angular/router";
import { RouteService } from '../services/route.service';
import { Channel } from '../data/channel';
import { Message } from '../data/message';
import { User } from '../data/user';

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
  valid: boolean;
  groupName: string;
  channelName: string;
  channel: Channel;
  user: User;
  users: User[];
  path: string;

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
      this.messages = data.ch.messages;
    });
  }

  /**
   * Function for sending the messages to the server.
   */
  private initIoConnection(){
    this.socketService.initSocket(this.channelName);
    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        // Add new message to the messages array
        this.messages.push(message);
        this.service.addMsg(this.channel).subscribe((data) => {
          if(data.err == null){
            console.log("saved");
          }
        });
      });
    this.socketService.onJoin().subscribe((data:Message) => {
      this.messages.push(data);
    });
    this.socketService.onLeave().subscribe((data:Message) => {
      console.log(data);
      this.messages.push(data);
    });
  }

  /**
   * Function for when the message is to be sent.
   */
  private chat(){
    if(this.messagecontent){
      // Check there is a message to send
      var msg = new Message(this.user.username, this.messagecontent, this.user.path);
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

  /**
   * Function that disconnects user from the room.
   */
  private leaveRoom(){
    var msg = new Message(null, "A user has left the room.", null);
    this.socketService.send(msg);
    this.messages.push(msg);
    this.router.navigate(['']);
  }

  /**
   * Function that process image uploads.
   */
  processFile(imageInput){
    const file: File = imageInput.files[0];
    const form = new FormData();
    form.append('file', file, file.name);
    this.service.upFile(form).subscribe(
      (res) => {this.path = res.ok;}
    )
  }

  /**
   * Submits the image to be sent as message
   */
  imgSubmit(){
    var msg = new Message(this.user.username, this.messagecontent, this.user.path);
    msg.img = this.path;
    this.socketService.send(msg);
    this.path = null;
  }
  
}
