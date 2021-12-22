import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../_service/authentication.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated = false;
  userFullName: string;

  constructor(public authenticationService: AuthenticationService, private router: Router, private toastr: ToastrService ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authenticationService.logOut();
    this.router.navigate(['/login']).then(r => {});
    this.toastr.info('You have logged out successfully');
  }

}
