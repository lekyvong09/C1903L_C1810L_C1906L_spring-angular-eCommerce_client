import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import { faPlus, faSync, faEdit, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  faUser = faUser; faPlus = faPlus; faSync = faSync; faEdit = faEdit; faTrash = faTrash;

  showLoading: boolean;
  private subscriptions: Subscription[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
