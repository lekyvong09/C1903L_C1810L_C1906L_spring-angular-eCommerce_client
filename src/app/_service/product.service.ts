import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../_model/product';
import {map} from 'rxjs/operators';
import {ProductCategory} from '../_model/product-category';

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


  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetProductCategoryResponse>(`${this.baseUrl}product-category`).pipe(
        map(response => response._embedded.productCategory)
    );
  }


  searchProduct(theKeyword: string): Observable<Product[]> {
    return this.httpClient.get<GetProductResponse>(`${this.baseUrl}products/search/findByNameContaining?name=${theKeyword}`).pipe(
        map(response => response._embedded.products)
    );
  }


  getProduct(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}products/${productId}`);
  }

}

interface GetProductResponse {
  _embedded: {
    products: Product[];
  };
}

interface GetProductCategoryResponse {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
