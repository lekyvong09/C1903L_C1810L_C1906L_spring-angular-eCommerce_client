import { Injectable } from '@angular/core';
import {CartItem} from '../_model/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: number;
  totalQuantity: number;

  constructor() { }


  addToCart(theCartItem: CartItem): void {

    // check whether theCartItem already exist in the cartItems;
    let existingCartItem: CartItem;
    let alreadyExistInCart: boolean;
    if (this.cartItems.length > 0) {
      for (const tempCartItem of this.cartItems) {
        if (tempCartItem.id === theCartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }
      }

      alreadyExistInCart = (existingCartItem !== undefined);
    }

    if (alreadyExistInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }

    this.computeCartTotal();
  }


  private computeCartTotal(): void {
    this.totalPrice = 0;
    this.totalQuantity = 0;

    for (const currentCartItem of this.cartItems) {
      this.totalPrice += currentCartItem.quantity * currentCartItem.unitPrice;
      this.totalQuantity += currentCartItem.quantity;
    }

    // for logging & testing purpose
    for (const tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name=${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotal=${subTotalPrice}`);
    }
    console.log(`totalPrice=${this.totalPrice.toFixed(2)}, totalQUantity=${this.totalQuantity}`);
    console.log('------');
  }
}
