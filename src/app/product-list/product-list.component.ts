import { Component, OnInit } from '@angular/core';
import {ProductService} from '../_service/product.service';
import {Product} from '../_model/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProduct();
  }


  listProduct(): void {
    this.productService.getProductList().subscribe(
        data => {
          this.products = data;
          console.log(data);
        }
    );
  }

}
