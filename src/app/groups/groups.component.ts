import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups: string[] =[];
  newGroup: boolean = false;
  name: string = "";
  selectedGroup: string = "";
  valid: string = "";
  

  constructor(private router: Router) {
    this.valid = localStorage.getItem("valid");
    if(this.valid != "true"){
      this.router.navigate(['login']);
    }
   }

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

  private onSelect(group: string){
    this.router.navigate(['channel']);
  }

  private deleteGroup(){
    console.log("delete")
  }

}
