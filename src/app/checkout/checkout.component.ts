import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CartService} from '../_service/cart.service';
import {CheckoutFormService} from '../_service/checkout-form.service';
import {Country} from '../_model/country';
import {State} from '../_model/state';
import {CheckoutValidator} from '../_validators/checkoutValidator';
import {Order} from '../_model/order';
import {OrderItem} from '../_model/order-item';
import {Purchase} from '../_model/purchase';
import {CheckoutService} from '../_service/checkout.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  totalPrice = 0.00;
  totalQuantity = 0;

  constructor(private formBuilder: FormBuilder, private cartService: CartService, private router: Router,
              private checkoutFormService: CheckoutFormService, private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.cartService.totalPrice$.subscribe(data => this.totalPrice = data);
    this.cartService.totalQuantity$.subscribe(data => this.totalQuantity = data);

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), CheckoutValidator.notOnlyWhitespace]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), CheckoutValidator.notOnlyWhitespace]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: ['', Validators.required],
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2), CheckoutValidator.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    this.checkoutFormService.getCreditCardYears().subscribe(data => this.creditCardYears = data);
    this.checkoutFormService.getCreditCardMonths(new Date().getMonth() + 1).subscribe(data => this.creditCardMonths = data);

    this.checkoutFormService.getCountries().subscribe(data => this.countries = data);
  }

  onSubmit(): void {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    // console.log(this.checkoutFormGroup.get('customer').value);
    // const order = {totalQuantity: 0, totalPrice: 0};
    const order = new Order();
    order.totalQuantity = this.totalQuantity;
    order.totalPrice = this.totalPrice;

    const cartItems = this.cartService.cartItems;

    // const orderItems: OrderItem[] = [];
    // for (let i = 0; i < cartItems.length; i++) {
    //   orderItems[i] = new OrderItem((cartItems[i]));
    // }
    const orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    const purchase = new Purchase();

    purchase.user = this.checkoutFormGroup.controls.customer.value;

    purchase.shippingAddress = this.checkoutFormGroup.controls.shippingAddress.value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    purchase.shippingAddress.state = shippingState.name;
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.country = shippingCountry.name;

    purchase.billingAddress = this.checkoutFormGroup.controls.billingAddress.value;
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    purchase.billingAddress.state = billingState.name;
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.country = billingCountry.name;

    purchase.orderItems = orderItems;
    purchase.order = order;

    console.log(purchase);
    this.checkoutService.placeOrder(purchase).subscribe({
      next: response => {
        alert(`Your order has been received. \nOrder tracking number: ${response.orderTrackingNumber}`);
        this.resetCart();
      },
      error: err => alert(`There is an error ${err.message}`)
    });
  }

  private resetCart(): void {
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    this.checkoutFormGroup.reset();

    this.router.navigateByUrl('/product').then(r => {});
  }


  copyShippingAddressToBillingAddress(event): void {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
      this.billingAddressStates = [];
    }
  }


  handleMonthsAndYears(): void {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    let startMonth: number;

    if (selectedYear === new Date().getFullYear()) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.checkoutFormService.getCreditCardMonths(startMonth).subscribe(data => this.creditCardMonths = data);

  }


  getStates(formGroupName: string): void {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup.value.country.code;

    this.checkoutFormService.getStates(countryCode).subscribe(
        data => {
          if (formGroupName === 'shippingAddress') {
            this.shippingAddressStates = data;
          } else {
            this.billingAddressStates = data;
          }

          formGroup.get('state').setValue(data[0]);
        }
    );
  }


  get firstName(): AbstractControl { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName(): AbstractControl { return this.checkoutFormGroup.get('customer.lastName'); }
  get email(): AbstractControl { return this.checkoutFormGroup.get('customer.email'); }

  get cardType(): AbstractControl { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get nameOnCard(): AbstractControl { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get cardNumber(): AbstractControl { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get securityCode(): AbstractControl { return this.checkoutFormGroup.get('creditCard.securityCode'); }

}
