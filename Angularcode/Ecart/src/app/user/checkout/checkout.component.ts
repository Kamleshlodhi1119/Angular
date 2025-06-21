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
  items: CartItem[] = [];
  total = 0;

 // constructor(private cartService: CartService) { }
constructor(
  private cartService: CartService,
  private router: Router,
  private userSession: UserSessionService, 
  private fb: FormBuilder,
  private cart: CartService,
  private orders: OrderService,
  // private router: Router,
  // private userSession: UserSessionService // ✅ inject user session
  ) {
    // this.form = this.fb.group({
    //   address1: '',
    //   city: '',
    //   state: '',
    //   zipCode: ''
    this.form = this.fb.group({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  paymentMethod: 'CASH_ON_DELIVERY'
});

    // });
  }


  ngOnInit() {
    // const email = 'k@gmail.com'; // Ideally from auth service
    const email = this.userSession.getUserEmail(); // ✅ dynamically get current user email

  if (!email) {
    console.error('User not logged in');
    this.router.navigate(['/login']); // Or handle it gracefully
    return;
  }
    this.cartService.getCartItems(email).subscribe(data => {
      this.items = data;
      this.calculateTotal();
    });

    // const email = this.userSession.getUserEmail();
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

  remove({ productId, customerEmail }: { productId: number; customerEmail: string }) {
    this.cartService.deleteCartItemByProduct(productId, customerEmail, 0).subscribe(() => {
      this.items = this.items.filter(i => i.productId !== productId);
      this.calculateTotal();
    });
  }

  change({ productId, customerEmail, quantity }: { productId: number; customerEmail: string; quantity: number }) {
    this.cartService.updateCartItemQuantity(productId, customerEmail, quantity).subscribe(updated => {
      const item = this.items.find(i => i.productId === productId);
      if (item) item.quantity = updated.quantity;
      this.calculateTotal();
    });
  }

  private calculateTotal() {
    this.total = this.items.reduce((t, i) => t + i.quantity * i.price, 0);
  }



  goToCheckout() {
    this.router.navigate(['/checkout']);  // 🔁 Match this with your routing path
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
