import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../_service/authentication.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpResponse} from '@angular/common/http';
import {User} from '../_model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(private authenticationService: AuthenticationService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/user/management').then(r => {});
    } else {
      this.router.navigateByUrl('/login').then(r => {});
    }
  }

  onLogin(user: any): void {
    this.authenticationService.login(user).subscribe(
        (response: HttpResponse<User>) => {
          console.log(response.headers);
          console.log(response.body);
        }
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
