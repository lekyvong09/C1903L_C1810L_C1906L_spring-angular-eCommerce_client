import { Component, OnInit } from '@angular/core';
import {ProductService} from '../_service/product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../_model/product';
import {CartService} from '../_service/cart.service';
import {CartItem} from '../_model/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;

  constructor(private productService: ProductService, private route: ActivatedRoute,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }


  handleProductDetails(): void {
    this.productService.getProduct(+this.route.snapshot.paramMap.get('id')).subscribe(data => this.product = data);
  }


  addToCart(): void {
    console.log(`Adding to cart ${this.product.name}, ${this.product.unitPrice}`);
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }

}
