import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../_service/authentication.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated = false;
  userFullName: string;

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authenticationService.logOut();
  }

}
