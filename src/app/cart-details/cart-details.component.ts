import { Component, OnInit } from '@angular/core';
import {CartService} from '../_service/cart.service';
import {CartItem} from '../_model/cart-item';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice = 0;
  totalQuantity = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }


  listCartDetails(): void {
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice$.subscribe(
        data => this.totalPrice = data
    );

    this.cartService.totalQuantity$.subscribe(
        data => this.totalQuantity = data
    );

  }

}
