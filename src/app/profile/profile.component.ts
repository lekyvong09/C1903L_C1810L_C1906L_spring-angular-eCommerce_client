import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {AuthenticationService} from '../_service/authentication.service';
import {User} from '../_model/user';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  faSpinner = faSpinner;
  refreshing: boolean;
  fileStatus: any;
  user: User;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getUserInfoFromLocalCache();
  }

  updateProfileImage(): void {

  }

  onUpdateCurrentUser(ngForm: NgForm): void {

  }
}
