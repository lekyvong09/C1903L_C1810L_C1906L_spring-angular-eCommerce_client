import { Component, OnInit } from '@angular/core';
import {ProductService} from '../_service/product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../_model/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }


  handleProductDetails(): void {
    this.productService.getProduct(+this.route.snapshot.paramMap.get('id')).subscribe(data => this.product = data);
  }

}
