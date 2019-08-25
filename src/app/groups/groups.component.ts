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

  onClickGroup(){
    if(!this.newGroup){
      this.newGroup = true;
    } else {
      this.newGroup = false;
    }
  }

  itemSubmit(){
    console.log(this.name);
  }

}
