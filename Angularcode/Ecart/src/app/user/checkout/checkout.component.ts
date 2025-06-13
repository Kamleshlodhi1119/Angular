// src/app/user/checkout/checkout.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { OrderService } from '../../shared/services/order.service';
import { CartItem } from '../../shared/models/cart.model';
import { UserSessionService } from 'src/app/shared/services/user-session.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  form: FormGroup;
  cartItems: CartItem[] = [];

  constructor(
    private fb: FormBuilder,
    private cart: CartService,
    private orders: OrderService,
    private router: Router,
    private userSession: UserSessionService // ✅ inject user session
  ) {
    this.form = this.fb.group({
      address1: '',
      city: '',
      state: '',
      zipCode: ''
    });
  }

  ngOnInit(): void {
    const email = this.userSession.getUserEmail();
    const userid=this.userSession.getUserId();
    if (!email) {
      alert('User not logged in!');
      this.router.navigate(['/login']);
      return;
    }

    this.cart.getCartItems(email).subscribe(items => {
      this.cartItems = items;
    });
  }

  placeOrder(): void {
    const user = this.userSession.getUser();
    if (!user) {
      alert('User session expired. Please login again.');
      this.router.navigate(['/login']);
      return;
    }

    if (this.cartItems.length === 0) {
      alert('Cart is empty!');
      return;
    }

    const orderPayload = {
      customerId: user.id, // ✅ dynamic ID
      paymentMethod: 'CASH_ON_DELIVERY',
      status: 'CONFIRMED',
      orderDate: new Date().toISOString(),
      deliveryDate: null,
      items: this.cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };

    this.orders.placeOrder(orderPayload).subscribe(() => {
      this.router.navigate(['/orders']);
    });
  }
}
