import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CartService} from '../_service/cart.service';
import {CheckoutFormService} from '../_service/checkout-form.service';
import {Country} from '../_model/country';
import {State} from '../_model/state';

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

  constructor(private formBuilder: FormBuilder, public cartService: CartService,
              private checkoutFormService: CheckoutFormService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
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
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    this.checkoutFormService.getCreditCardYears().subscribe(data => this.creditCardYears = data);
    this.checkoutFormService.getCreditCardMonths(new Date().getMonth() + 1).subscribe(data => this.creditCardMonths = data);

    this.checkoutFormService.getCountries().subscribe(data => this.countries = data);
  }

  onSubmit(): void {
    console.log(this.checkoutFormGroup.get('customer').value);
  }


  copyShippingAddressToBillingAddress(event): void {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
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

}
