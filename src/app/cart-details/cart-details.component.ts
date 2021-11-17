import { Component, OnInit } from '@angular/core';
import {CartService} from '../_service/cart.service';
import {CartItem} from '../_model/cart-item';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];

  faPlus = faPlus; faMinus = faMinus;

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }


  listCartDetails(): void {
    this.cartItems = this.cartService.cartItems;

    // this.cartService.totalPrice$.subscribe(
    //     data => this.totalPrice = data
    // );
    //
    // this.cartService.totalQuantity$.subscribe(
    //     data => this.totalQuantity = data
    // );

  }

}
