import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import { faPlus, faSync, faEdit, faTrash, faUser, faLock, faUnlock, faIdBadge, faEnvelope, faShieldAlt, faSignInAlt, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../_service/user.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {User} from '../_model/user';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {finalize} from 'rxjs/operators';
import {NgForm} from '@angular/forms';
import {CustomHttpResponse} from '../_model/custom-http-response';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  faUser = faUser; faPlus = faPlus; faSync = faSync; faEdit = faEdit; faTrash = faTrash; faLock = faLock; faUnlock = faUnlock;
  faIdBadge = faIdBadge; faEnvelope = faEnvelope; faShieldAlt = faShieldAlt; faSignInAlt = faSignInAlt; faRedoAlt = faRedoAlt;

  users: User[];
  selectedUser: User;
  showLoading: boolean;
  private subscriptions: Subscription[] = [];

  thePageNumber: number;
  thePageSize: number;
  theTotalElements: number;

  uploadFileName: string;
  profileImage: File;
  editUser: User;

    currentUsername: string;

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
          this.users.forEach(user => user.rolesInput = user.roles.map(role => role.name));

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

    searchUserWithJavascript(ngForm: NgForm): void {
        console.log(ngForm.value.searchTerm);
        const result: User[] = [];
        for (const user of this.userService.getUsersFromLocalCache()) {
            if (user.firstName.toLowerCase().indexOf(ngForm.value.searchTerm.toLowerCase()) !== -1 ||
                user.lastName.toLowerCase().indexOf(ngForm.value.searchTerm.toLowerCase()) !== -1 ||
                user.username.toLowerCase().indexOf(ngForm.value.searchTerm.toLowerCase()) !== -1 ||
                user.userId.toLowerCase().indexOf(ngForm.value.searchTerm.toLowerCase()) !== -1 ||
                user.email.toLowerCase().indexOf(ngForm.value.searchTerm.toLowerCase()) !== -1 )
            {
                result.push(user);
            }
        }
        this.users = result;

        if (result.length === 0  || !ngForm.value.searchTerm) {
            this.users = this.userService.getUsersFromLocalCache();
        }
    }

    onEditUser(editUser: User): void {
        this.editUser = editUser;
        this.currentUsername = editUser.username;
        document.getElementById('openUserEdit').click();
    }

    submitEditUser(editUserForm: NgForm): void {
      // console.log(ngForm.value);
      const formData = this.userService.createUserFormDate(this.currentUsername, this.editUser, this.profileImage);
      this.subscriptions.push(this.userService.updateUser(formData).subscribe(
          response => {
              console.log(response);
              document.getElementById('edit-user-close').click();
              this.getUsers(false);
              this.uploadFileName = null;
              this.profileImage = null;
              editUserForm.reset();
              this.toastr.success(`${response.firstName} ${response.lastName} has been updated successfully!`);
          }, error => this.toastr.error(error.error.message)
      ));
    }

    saveEditUser(): void {
      document.getElementById('edit-user-save').click();
    }

    onDeleteUser(deleteUser: User): void {
      this.subscriptions.push(this.userService.deleteUser(deleteUser.id).subscribe(
          (response: CustomHttpResponse) => {
              this.toastr.success(response.message);
              this.getUsers(false);
          }, err => this.toastr.error(err.error.message)
      ));
    }

    onResetPassword(user: User): void {
      this.showLoading = true;
      this.subscriptions.push(this.userService.resetPassword(user.email)
          .pipe(finalize(() => this.showLoading = false))
          .subscribe(
          (response: CustomHttpResponse) => this.toastr.success(`${response.message}`),
          error => this.toastr.error(error.error.message)
      ));

    }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
