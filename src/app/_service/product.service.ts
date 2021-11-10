import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../_model/product';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/';

  constructor(private httpClient: HttpClient) { }

  public getProductList(): Observable<Product[]> {
    return this.httpClient.get<GetProductResponse>(`${this.baseUrl}products`).pipe(
        map(response => response._embedded.products)
    );
  }

  public getProductListByCategoryId(theCategoryId: number): Observable<Product[]> {
    return this.httpClient.get<GetProductResponse>(`${this.baseUrl}products/search/findByCategoryId?id=${theCategoryId}`).pipe(
        map(response => response._embedded.products)
    );
  }

}

interface GetProductResponse {
  _embedded: {
    products: Product[];
  };
}
