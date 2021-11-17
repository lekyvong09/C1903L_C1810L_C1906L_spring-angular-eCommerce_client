import { Component, OnInit } from '@angular/core';
import {CartService} from '../_service/cart.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  faShoppingCart = faShoppingCart;
  constructor(public cartService: CartService) { }

  ngOnInit(): void {
  }

}
