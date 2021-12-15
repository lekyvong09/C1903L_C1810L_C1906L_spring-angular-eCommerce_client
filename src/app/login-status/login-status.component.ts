import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated = false;
  userFullName: string;

  constructor() { }

  ngOnInit(): void {
    this.isAuthenticated = true;
    this.userFullName = 'Test User';
  }

  logout(): void {
    this.isAuthenticated = false;
  }

}
