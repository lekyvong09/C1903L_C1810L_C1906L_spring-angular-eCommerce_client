import {Component, OnDestroy, OnInit} from '@angular/core';
import {faCamera, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {AuthenticationService} from '../_service/authentication.service';
import {User} from '../_model/user';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {UserService} from '../_service/user.service';
import {ToastrService} from 'ngx-toastr';
import {finalize} from 'rxjs/operators';
import {HttpEvent, HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  faSpinner = faSpinner; faCamera = faCamera;
  refreshing: boolean;
  fileStatus: any;
  user: User;
  progress: number;

  profileImage: File;

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getUserInfoFromLocalCache();
  }

  updateProfileImage(): void {
    document.getElementById('profile-image-input').click();
  }

  onUpdateCurrentUser(ngForm: NgForm): void {
    this.refreshing = true;
    console.log(ngForm.value);
    const formData = this.userService.createUserFormDate(this.authenticationService.getLoggedInUsername(), ngForm.value, this.profileImage);
    this.subscriptions.push(this.userService.updateUser(formData)
        .pipe(finalize(() => {this.refreshing = false; this.profileImage = null; }))
        .subscribe(
        response => {
          console.log(response);
          this.authenticationService.addUserInfoToLocalCache(response);
          this.toastr.success(`${response.firstName} ${response.lastName} has been updated successfully`);
        }, error => this.toastr.error(error.error.message)
    ));
  }

  onProfileImageChange(event: any): void {
    // this.uploadFileName = event.target.files[0].name;
    this.profileImage = event.target.files[0];
    console.log(event);
  }

  onUpdateProfileImage(): void {
    const formData = new FormData();
    this.progress = 0;
    formData.append('profileImage', this.profileImage);
    formData.append('username', this.user.username);

    this.subscriptions.push(this.userService.updateProfileImage(formData)
        .pipe(finalize(() => {this.refreshing = false; this.profileImage = null; }))
        .subscribe(
          (event: HttpEvent<User>) => {
                if (event.type === HttpEventType.UploadProgress) {
                  this.progress = Math.round(100 * event.loaded / event.total);
                } else if (event.type === HttpEventType.Response) {
                  if (event.status === 200) {
                    this.user.profileImageUrl = `${event.body.profileImageUrl}?time=${new Date().getTime()}`;
                    this.toastr.success(`${event.body.firstName} ${event.body.lastName} image has been updated successfully`);
                  } else {
                    this.toastr.error(`Unable to upload profile image. Please try again`);
                  }
                }
              }, error => this.toastr.error(error.error.message)
    ));
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
