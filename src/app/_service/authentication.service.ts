import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {User} from '../_model/user';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private baseUrl = environment.apiUrl;
  private token: string;
  private loggedInUsername: string;
  private jwtHelper = new JwtHelperService();

  constructor(private httpClient: HttpClient) { }

  public register(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}user/register`, user);
  }

  public login(user: User): Observable<HttpResponse<User>> {
    return this.httpClient.post<User>(`${this.baseUrl}user/login`, user, {observe: 'response'});
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public addUserInfoToLocalCache(user: User): void {
    user.rolesToDisplay = user.roles.map(role => role.name.substring(5)).join(', ');
    user.rolesInput = user.roles.map(role => role.name);
    user.authoritiesToDisplay = user.authorities.map(element => element.privilege);
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserInfoFromLocalCache(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  public getToken(): string {
    return this.token;
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  public isLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== '') {
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)){
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else  {
      this.logOut();
      return false;
    }
  }

  public logOut(): void {
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  checkRole(roleToCheck: string): boolean {
    this.loadToken();
    return (this.jwtHelper.decodeToken(this.token).authorities as Array<string>).indexOf(roleToCheck) !== -1;
  }

  roleMatch(allowedRole: Array<string>): boolean {
    this.loadToken();
    let isMatch = false;
    const userRoles = this.jwtHelper.decodeToken(this.token).authorities as Array<string>;
    allowedRole.forEach(element => {
      if (userRoles.includes(element)) {
        isMatch = true;
      }
    });
    return isMatch;
  }

  public getLoggedInUsername(): string {
    return this.loggedInUsername;
  }

}
