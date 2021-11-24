import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Purchase} from '../_model/purchase';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class CheckoutService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}checkout/purchase`, purchase);
  }
}
