import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../_service/authentication.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {User} from '../_model/user';
import {faUser, faIdCard, faEnvelope, faSpinner} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  faUser = faUser;
  faIdCard = faIdCard;
  faEnvelope = faEnvelope;
  faSpinner = faSpinner;
  showLoading: boolean;
  private subscriptions: Subscription[] = [];

  constructor(private authenticationService: AuthenticationService, private router: Router, private  toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/user/management').then(r => {});
    }
  }

  onRegister(user: any): void {
    this.showLoading = true;
    console.log(user);
    this.authenticationService.register(user)
        .pipe(finalize(() => this.showLoading = false))
        .subscribe((response: User) =>
            {this.router.navigateByUrl('/login')
                  .then(r => this.toastr.success(`A new account was created for ${response.firstName}. Please check your email`));
            }, error => this.toastr.error(error.error.message)
        );

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
