// src/app/user/checkout/checkout.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { OrderService } from '../../shared/services/order.service';
import { CartItem } from '../../shared/models/cart.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  form: FormGroup;
  customerId: number = 38; // 🔁 Replace this with dynamic user ID (e.g., from AuthService)
  customerEmail: string = 'k@gmail.com'; // 🔁 Replace this too
  cartItems: CartItem[] = [];

  constructor(
    private fb: FormBuilder,
    private cart: CartService,
    private orders: OrderService,
    private router: Router
  ) {
    this.form = this.fb.group({
      address1: '',
      city: '',
      state: '',
      zipCode: ''
    });
  }

  ngOnInit(): void {
    this.cart.getCartItems(this.customerEmail).subscribe(items => {
      this.cartItems = items;
    });
  }

  placeOrder(): void {
    if (this.cartItems.length === 0) {
      alert('Cart is empty!');
      return;
    }

    const orderPayload = {
      customerId: this.customerId,
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
