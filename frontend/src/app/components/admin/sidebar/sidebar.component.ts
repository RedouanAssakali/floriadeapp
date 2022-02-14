import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../../services/account.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  constructor(private accountService: AccountService) { }
  admin:User;
  poisIsClicked: boolean = false;

  pages: string[];
  ngOnInit(): void {
    this.pages= ["Home","Poi's"]
    this.admin = this.accountService.userValue.user
  }






  signout() {
    this.accountService.logout();
  }
  activateClass(pages: any){
    pages.active = !pages.active;
  }
  clickPois(){
    this.poisIsClicked = true;
  }
}
