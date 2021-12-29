import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../_service/authentication.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpResponse} from '@angular/common/http';
import {User} from '../_model/user';
import { faUser, faKey, faSpinner } from '@fortawesome/free-solid-svg-icons';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  faUser = faUser;
  faKey = faKey;
  faSpinner = faSpinner;

  showLoading: boolean;
  private subscriptions: Subscription[] = [];

  constructor(private authenticationService: AuthenticationService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/products').then(r => {});
    } else {
      this.router.navigateByUrl('/login').then(r => {});
    }
  }

  onLogin(user: any): void {
    // console.log(user);
    this.showLoading = true;
    this.subscriptions.push(
        this.authenticationService.login(user)
          .pipe(finalize(() => this.showLoading = false))
          .subscribe(
              (response: HttpResponse<User>) => {
                const token = response.headers.get('Jwt-Token');
                this.authenticationService.saveToken(token);
                this.authenticationService.addUserInfoToLocalCache(response.body);
                this.router.navigateByUrl('/products').then(r => {});
              }, error => {
                console.log(error);
                this.toastr.error(error.error.message);
              }
          )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
