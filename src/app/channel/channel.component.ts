import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { RouteService } from '../services/route.service';
import { Group } from '../data/group';
import { Channel } from '../data/channel';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  valid:boolean = false;
  name:string = "";
  group: string = "";
  user;
  users;

  constructor(private router: Router, private route:ActivatedRoute, private service:RouteService) { 
    this.valid = JSON.parse(localStorage.getItem("valid"));
    if(!this.valid){
      this.router.navigate(['login']);
    }
    this.user = JSON.parse(localStorage.getItem("user"));
    // this.users = JSON.parse(localStorage.getItem("users"));
  }

  ngOnInit() {
    this.group = this.route.snapshot.params['group'];
  }

  /**
   * Function that creates a channel for a group.
   */
  private channelSubmit(){
    var ch = new Channel(this.name);
    ch.members.push(this.user);
    this.service.addCh({group: this.group, channel: ch}).subscribe((data) => {
      console.log(data)
      if(data.err == null){
        this.router.navigate(['']);
      }
    });
  }

}
