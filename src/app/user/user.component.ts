import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import { faPlus, faSync, faEdit, faTrash, faUser, faLock, faUnlock, faIdBadge, faEnvelope, faShieldAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../_service/user.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {User} from '../_model/user';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {finalize} from 'rxjs/operators';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  faUser = faUser; faPlus = faPlus; faSync = faSync; faEdit = faEdit; faTrash = faTrash; faLock = faLock; faUnlock = faUnlock;
  faIdBadge = faIdBadge; faEnvelope = faEnvelope; faShieldAlt = faShieldAlt; faSignInAlt = faSignInAlt

  users: User[];
  selectedUser: User;
  showLoading: boolean;
  private subscriptions: Subscription[] = [];

  thePageNumber: number;
  thePageSize: number;
  theTotalElements: number;

  uploadFileName: string;
  profileImage: File;

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.thePageNumber = 1;
    this.thePageSize = 4;
    this.theTotalElements = 0;
    this.getUsers(true);
  }

  getUsers(showNotification: boolean): void {
    this.showLoading = true;
    this.subscriptions.push(this.userService.getUsers(this.thePageNumber - 1, this.thePageSize)
        .pipe(finalize(() => this.showLoading = false))
        .subscribe(data => {
          this.userService.addUsersToLocalCache(data.users.content);
          this.users = data.users.content;
          this.users.forEach(user => user.rolesToDisplay = user.roles.map(role => role.name.substring(5)).join(', '));

          this.thePageNumber = data.page.number + 1;
          this.thePageSize = data.page.size;
          this.theTotalElements = data.page.totalElements;

          if (showNotification) {
            this.toastr.success(`${data.users.content.length} users loaded successfully`);
          }
        }, error => this.toastr.error(error.error.message)
    ));
  }

  openModal(content): void {
    this.modalService.open(content).result.then(
        (resultonFulfilled) => console.log(resultonFulfilled ? resultonFulfilled : 'save'),
        (reasonOnReject) => console.log(reasonOnReject ? reasonOnReject : 'cancel'));
  }

  onSelectUser(user: User): void {
    this.selectedUser = user;
    document.getElementById('openUserInfo').click();
  }

  onAddNewUser(newUserForm: NgForm): void {
    // console.log(newUserForm.value);
    const formData = this.userService.createUserFormDate(null, newUserForm.value, this.profileImage);
    this.subscriptions.push(this.userService.addUser(formData).subscribe(
        response => {
          console.log(response);
          document.getElementById('new-user-close').click();
          this.getUsers(false);
          this.uploadFileName = null;
          this.profileImage = null;
          newUserForm.reset();
          this.toastr.success(`${response.firstName} ${response.lastName} has been added successfully`);
        }, error => {
          this.toastr.error(error.error.message);
        }
    ));
  }

  onProfileImageChange(event: any): void {
    this.uploadFileName = event.target.files[0].name;
    this.profileImage = event.target.files[0];
    console.log(event);
  }

  saveNewUser(): void {
    document.getElementById('new-user-save').click();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
