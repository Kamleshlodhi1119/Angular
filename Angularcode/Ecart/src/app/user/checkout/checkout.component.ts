// // src/app/user/checkout/checkout.component.ts

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { Router } from '@angular/router';
// import { CartService } from '../../shared/services/cart.service';
// import { OrderService } from '../../shared/services/order.service';
// import { CartItem } from '../../shared/models/cart.model';
// import { UserSessionService } from 'src/app/shared/services/user-session.service';

// @Component({
//   selector: 'app-checkout',
//   templateUrl: './checkout.component.html',
//   styleUrls: ['./checkout.component.css']
// })
// export class CheckoutComponent implements OnInit {
//   form: FormGroup;
//   cartItems: CartItem[] = [];
//   items: CartItem[] = [];
//   total = 0;

//  // constructor(private cartService: CartService) { }
// constructor(
//   private cartService: CartService,
//   private router: Router,
//   private userSession: UserSessionService, 
//   private fb: FormBuilder,
//   private cart: CartService,
//   private orders: OrderService,
//   ) {
//     this.form = this.fb.group({
//   firstName: '',
//   lastName: '',
//   email: '',
//   phone: '',
//   address1: '',
//   address2: '',
//   city: '',
//   state: '',
//   zipCode: '',
//   country: '',
//   paymentMethod: 'CASH_ON_DELIVERY'
// });

//     // });
//   }


//   ngOnInit() {
//     // const email = 'k@gmail.com'; // Ideally from auth service
//     const email = this.userSession.getUserEmail(); // ✅ dynamically get current user email

//   if (!email) {
//     console.error('User not logged in');
//     this.router.navigate(['/login']); // Or handle it gracefully
//     return;
//   }
//     this.cartService.getCartItems(email).subscribe(data => {
//       this.items = data;
//       this.calculateTotal();
//     });

//     // const email = this.userSession.getUserEmail();
//     const userid=this.userSession.getUserId();
//     if (!email) {
//       alert('User not logged in!');
//       this.router.navigate(['/login']);
//       return;
//     }

//     this.cart.getCartItems(email).subscribe(items => {
//       this.cartItems = items;
//     });
//   }

//   remove({ productId, customerEmail }: { productId: number; customerEmail: string }) {
//     this.cartService.deleteCartItemByProduct(productId, customerEmail).subscribe(() => {
//       this.items = this.items.filter(i => i.productId !== productId);
//       this.calculateTotal();
//     });
//   }

//   change({ productId, customerEmail, quantity }: { productId: number; customerEmail: string; quantity: number }) {
//     this.cartService.updateCartItemQuantity(productId, customerEmail, quantity).subscribe(updated => {
//       const item = this.items.find(i => i.productId === productId);
//       if (item) item.quantity = updated.quantity;
//       this.calculateTotal();
//     });
//   }

//   private calculateTotal() {
//     this.total = this.items.reduce((t, i) => t + i.quantity * i.price, 0);
//   }



//   goToCheckout() {
//     this.router.navigate(['/checkout']);  // 🔁 Match this with your routing path
//   }


 

//   placeOrder(): void {
//     const user = this.userSession.getUser();
//     if (!user) {
//       alert('User session expired. Please login again.');
//       this.router.navigate(['/login']);
//       return;
//     }

//     if (this.cartItems.length === 0) {
//       alert('Cart is empty!');
//       return;
//     }

//     const orderPayload = {
//       customerId: user.id, // ✅ dynamic ID
//       paymentMethod: 'CASH_ON_DELIVERY',
//       status: 'CONFIRMED',
//       orderDate: new Date().toISOString(),
//       deliveryDate: null,
//       items: this.cartItems.map(item => ({
//         productId: item.productId,
//         quantity: item.quantity
//       }))
//     };

//     this.orders.placeOrder(orderPayload).subscribe(() => {
//       this.router.navigate(['/orders']);
//     });
//   }
// }
// src/app/user/checkout/checkout.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private cartService: CartService,
    private router: Router,
    private userSession: UserSessionService,
    private fb: FormBuilder,
    private orders: OrderService
  ) {
    // Initialize form with validators
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
      paymentMethod: ['CASH_ON_DELIVERY', Validators.required]
    });
  }

  ngOnInit(): void {
    const email = this.userSession.getUserEmail();

    if (!email) {
      console.error('User not logged in');
      this.router.navigate(['/login']);
      return;
    }

    // Fetch items from cart for display and total calculation
    this.cartService.getCartItems(email).subscribe(data => {
      this.items = data;
      this.calculateTotal();
    });

    // Fetch items for placing the order
    this.cartService.getCartItems(email).subscribe(items => {
      this.cartItems = items;
    });
  }

  remove({ productId, customerEmail }: { productId: number; customerEmail: string }): void {
    this.cartService.deleteCartItemByProduct(productId, customerEmail).subscribe(() => {
      this.items = this.items.filter(i => i.productId !== productId);
      this.calculateTotal();
    });
  }

  change({ productId, customerEmail, quantity }: { productId: number; customerEmail: string; quantity: number }): void {
    this.cartService.updateCartItemQuantity(productId, customerEmail, quantity).subscribe(updated => {
      const item = this.items.find(i => i.productId === productId);
      if (item) item.quantity = updated.quantity;
      this.calculateTotal();
    });
  }

  private calculateTotal(): void {
    this.total = this.items.reduce((t, i) => t + i.quantity * i.price, 0);
  }

  goToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  placeOrder(): void {
    // Form validation
    if (this.form.invalid) {
      alert('Please complete all required fields in the form.');
      this.form.markAllAsTouched();
      return;
    }

    const user = this.userSession.getUser();
    if (!user) {
      alert('User session expired. Please login again.');
      this.router.navigate(['/login']);
      return;
    }

    // Validate cart
    if (this.cartItems.length === 0 || this.total <= 0) {
      alert('Your cart is empty or total is ₹0. Please add items before placing an order.');
      return;
    }

    // Prepare the order payload
    const orderPayload = {
      customerId: user.id,
      paymentMethod: this.form.value.paymentMethod,
      status: 'CONFIRMED',
      orderDate: new Date().toISOString(),
      deliveryDate: null,
      items: this.cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };

    // Place the order
    this.orders.placeOrder(orderPayload).subscribe(() => {
      this.router.navigate(['/orders']);
    });
  }
}
