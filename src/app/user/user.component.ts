import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import { faPlus, faSync, faEdit, faTrash, faUser, faLock, faUnlock, faIdBadge, faEnvelope, faShieldAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../_service/user.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {User} from '../_model/user';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  faUser = faUser; faPlus = faPlus; faSync = faSync; faEdit = faEdit; faTrash = faTrash; faLock = faLock; faUnlock = faUnlock;
  faIdBadge = faIdBadge; faEnvelope = faEnvelope; faShieldAlt = faShieldAlt; faSignInAlt = faSignInAlt

  users: User[];
  showLoading: boolean;
  private subscriptions: Subscription[] = [];

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
        (response: User[]) => {
          this.userService.addUsersToLocalCache(response);
          this.users = response;
        }, error => this.toastr.error(error.error.message)
    );
  }

  openUserInfo(content): void {
    this.modalService.open(content).result.then(
        (resultonFulfilled) => console.log(resultonFulfilled ? resultonFulfilled : 'save'),
        (reasonOnReject) => console.log(reasonOnReject ? reasonOnReject : 'cancel'));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
