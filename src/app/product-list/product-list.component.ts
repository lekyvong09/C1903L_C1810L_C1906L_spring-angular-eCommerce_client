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

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.route.paramMap.subscribe(() => {
          this.listProduct();
      });
  }


  listProduct(): void {

      const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

      if (hasCategoryId) {
          this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
          this.productService.getProductListByCategoryId(this.currentCategoryId).subscribe(
              data => {
                  this.products = data;
                  console.log(data);
              }
          );
      } else {
          this.productService.getProductList().subscribe(
          data => {
              this.products = data;
              console.log(data);
          });
      }
  }

}
