import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../_model/user';
import {CustomHttpResponse} from '../_model/custom-http-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}user/list`);
  }

  public addUser(formData: FormData): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}user/add`, formData);
  }

  public updateUser(formData: FormData): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}user/update`, formData);
  }

  public resetPassword(email: string): Observable<CustomHttpResponse> {
    return this.httpClient.get<any>(`${this.baseUrl}user/resetpassword/${email}`);
  }

  public updateProfileImage(formData: FormData): Observable<HttpEvent<User>> {
    return this.httpClient.post<User>(
        `${this.baseUrl}user/updateProfileImage`,
        formData,
        {reportProgress: true, observe: 'events'});
  }

  public deleteUser(userId: number): Observable<CustomHttpResponse> {
    return this.httpClient.delete<any>(`${this.baseUrl}user/delete/${userId}`);
  }

  public addUsersToLocalCache(users: User[]): void {
    users.forEach(user => user.rolesToDisplay = user.roles.map(role => role.name.substring(5)).join(', '));
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersFromLocalCache(): User[] {
    if (localStorage.getItem('users')) {
      return JSON.parse(localStorage.getItem('users'));
    }
    return null;
  }

  public createUserFormDate(loggedInUsername: string, user: User, profileImage: File): FormData {
    const formData = new FormData();
    formData.append('currentUsername', loggedInUsername);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('isActive', JSON.stringify(user.active));
    formData.append('isNonLocked', JSON.stringify(user.notLocked));
    formData.append('profileImage', profileImage);
    // role....
    return formData;
  }
}
