import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import {ProductService} from './_service/product.service';
import {HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {RouterModule, Routes} from '@angular/router';
import { ProductCategoryMenuComponent } from './product-category-menu/product-category-menu.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartStatusComponent } from './cart-status/cart-status.component';
import {CartService} from './_service/cart.service';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CheckoutComponent } from './checkout/checkout.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CheckoutFormService} from './_service/checkout-form.service';
import {CheckoutService} from './_service/checkout.service';
import { LoginComponent } from './login/login.component';
import { LoginStatusComponent } from './login-status/login-status.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }, // http://localhost:4200
  { path: '**', redirectTo: '/products', pathMatch: 'full' }, // http://localhost:4200/fewkvhbrkenvie
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
      ProductService,
      CartService,
      CheckoutFormService,
      CheckoutService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
