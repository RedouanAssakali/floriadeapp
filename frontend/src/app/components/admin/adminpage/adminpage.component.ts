import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../../services/account.service";
import {Router} from "@angular/router";
import {User} from "../../../models/user";

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

  constructor(private accountService: AccountService) { }
  admin:User

  ngOnInit(): void {

    this.admin = this.accountService.userValue.user
  }
  signout() {
    this.accountService.logout();
  }
}
