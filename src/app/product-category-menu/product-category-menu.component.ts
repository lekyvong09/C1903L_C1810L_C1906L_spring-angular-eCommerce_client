import { Component, OnInit } from '@angular/core';
import {ProductService} from '../_service/product.service';
import {ProductCategory} from '../_model/product-category';
import {AuthenticationService} from '../_service/authentication.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory[];

  constructor(private productService: ProductService, public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.listProductCategories();
  }


  listProductCategories(): void {
    this.productService.getProductCategories().subscribe(data => this.productCategories = data);
  }
}
