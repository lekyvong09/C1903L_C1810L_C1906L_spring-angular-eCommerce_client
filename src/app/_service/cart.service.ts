import { Injectable } from '@angular/core';
import {CartItem} from '../_model/cart-item';
import {ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice = new ReplaySubject<number>(1);
  totalPrice$ = this.totalPrice.asObservable();
  totalQuantity = new ReplaySubject<number>(1);
  totalQuantity$ = this.totalQuantity.asObservable();

  constructor() { }


  addToCart(theCartItem: CartItem): void {

    // check whether theCartItem already exist in the cartItems;
    let existingCartItem: CartItem;
    let alreadyExistInCart: boolean;
    if (this.cartItems.length > 0) {
      // for (const tempCartItem of this.cartItems) {
      //   if (tempCartItem.id === theCartItem.id) {
      //     existingCartItem = tempCartItem;
      //     break;
      //   }
      // }
      existingCartItem = this.cartItems.find(item => item.id === theCartItem.id);

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
    let totalPriceValue = 0;
    let totalQuantityValue = 0;

    for (const currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // for logging & testing purpose
    for (const tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name=${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotal=${subTotalPrice}`);
    }
    console.log(`totalPrice=${totalPriceValue.toFixed(2)}, totalQuantity=${totalQuantityValue}`);
    console.log('------');
  }
}
