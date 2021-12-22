import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import { faPlus, faSync, faEdit, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../_service/user.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {User} from '../_model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  faUser = faUser; faPlus = faPlus; faSync = faSync; faEdit = faEdit; faTrash = faTrash;

  users: User[];
  showLoading: boolean;
  private subscriptions: Subscription[] = [];

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) { }

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

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
