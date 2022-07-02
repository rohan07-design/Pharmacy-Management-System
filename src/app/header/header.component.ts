import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { UserService } from '../user/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  checkLogIn :any;
  checkLogout :any;
  enteredvalue:any = "";
  show = false;
  constructor(private _userService:UserService) { }

  ngOnInit(): void {
    this.checkLogIn = this._userService.loggedIn()
    this.checkLogout = this._userService.logout()
  }

 

  //showing and hiding admin
  showAdmin() {
    this.show = true;
  }
}
