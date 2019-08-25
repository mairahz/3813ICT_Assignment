import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups: string[] =[];
  newGroup: boolean = false;
  name: string = "";
  

  constructor() { }

  ngOnInit() {
  }

  private onClickGroup(){
    if(!this.newGroup){
      this.newGroup = true;
    } else {
      this.newGroup = false;
    }
  }

  private groupSubmit(){
    if(this.name){
      this.groups.push(this.name);
      this.newGroup = false;
      this.name = "";
    } else {
      alert("Please enter a group name.");
    }
  }

  private deleteGroup(){
    console.log("delete")
  }

}
