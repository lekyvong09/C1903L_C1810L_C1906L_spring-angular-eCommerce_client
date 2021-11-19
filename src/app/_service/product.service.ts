import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../_model/product';
import {map} from 'rxjs/operators';
import {ProductCategory} from '../_model/product-category';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class ProductService {

  private baseUrl = environment.apiUrl;

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


  public getProductListPagination(thePage: number, thePageSize: number): Observable<GetProductResponse> {
    return this.httpClient.get<GetProductResponse>(`${this.baseUrl}products?page=${thePage}&size=${thePageSize}`);
  }


  public getProductListByCategoryIdAndPagination(thePage: number, thePageSize: number,
                                                 theCategoryId: number): Observable<GetProductResponse> {
    return this.httpClient.get<GetProductResponse>(
        `${this.baseUrl}products/search/findByCategoryId?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`
    );
  }


  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetProductCategoryResponse>(`${this.baseUrl}product-category`).pipe(
        map(response => response._embedded.productCategory)
    );
  }


  searchProduct(thePage: number, thePageSize: number, theKeyword: string): Observable<GetProductResponse> {
    return this.httpClient.get<GetProductResponse>(
        `${this.baseUrl}products/search/findByNameContaining?name=${theKeyword}&page=${thePage}&size=${thePageSize}`);
  }


  getProduct(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}products/${productId}`);
  }

}

interface GetProductResponse {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  };
}

interface GetProductCategoryResponse {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
