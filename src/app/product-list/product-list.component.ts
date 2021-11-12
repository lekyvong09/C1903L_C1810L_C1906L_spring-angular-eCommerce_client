import { Component, OnInit } from '@angular/core';
import {ProductService} from '../_service/product.service';
import {Product} from '../_model/product';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number;

  thePageNumber: number;
  thePageSize: number;
  theTotalElements: number;


  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.thePageNumber = 1;
      this.thePageSize = 3;
      this.theTotalElements = 0;
      this.route.paramMap.subscribe(() => {
          this.listProduct();
      });
  }


    listProduct(): void {
        if (this.route.snapshot.paramMap.has('keyword')) {
            this.handleSearchProduct();
        } else {
            this.handleListProduct();
        }
    }

  handleListProduct(): void {

      const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

      if (hasCategoryId) {
          this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
          // this.productService.getProductListByCategoryId(this.currentCategoryId).subscribe(data => this.products = data);
          this.productService.getProductListByCategoryIdAndPagination(this.thePageNumber - 1,
                                                                                this.thePageSize, this.currentCategoryId).subscribe(
              data => {
                  this.products = data._embedded.products;
                  this.thePageNumber = data.page.number + 1;
                  this.thePageSize = data.page.size;
                  this.theTotalElements = data.page.totalElements;
              }
          );
      } else {
          // this.productService.getProductList().subscribe(data => this.products = data);
          this.productService.getProductListPagination(this.thePageNumber - 1, this.thePageSize).subscribe(
              data => {
                  this.products = data._embedded.products;
                  this.thePageNumber = data.page.number + 1;
                  this.thePageSize = data.page.size;
                  this.theTotalElements = data.page.totalElements;
              }
          );
      }
  }


  handleSearchProduct(): void {
      const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

      this.productService.searchProduct(theKeyword).subscribe(data => this.products = data);
  }

}
