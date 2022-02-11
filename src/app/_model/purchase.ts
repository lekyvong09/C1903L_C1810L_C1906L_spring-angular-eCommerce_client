import {Customer} from './customer';
import {Address} from './address';
import {Order} from './order';
import {OrderItem} from './order-item';

export class Purchase {
    user: Customer;
    shippingAddress: Address;
    billingAddress: Address;
    order: Order;
    orderItems: OrderItem[];
}
