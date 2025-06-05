import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../shared/services/order.service';
// import { Router } from 'express';
// import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { OrderItemComponent } from '../../components/order-item/order-item.component';
import { CartService } from '../../shared/services/cart.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({ selector: 'app-checkout',
 
  templateUrl: './checkout.component.html',
   styleUrls: ['./checkout.component.css'] 
  }
  )

export class CheckoutComponent {
  form = this.fb.group({ address1: '', city: '', state: '', zipCode: '' });
  constructor(private fb: FormBuilder, private cart: CartService, private orders: OrderService, private router: Router) {}
  placeOrder() {
    const order = { items: this.cart.getItems(), ...this.form.value };
    this.orders.placeOrder(order).subscribe(() => { this.cart.clearCart(); this.router.navigate(['/user/orders']); });
  }
}

// export class CheckoutComponent {
//   form: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private cart: CartService,
//     private orders: OrderService,
//     private router: Router
//   ) {
//     this.form = this.fb.group({
//       address1: '',
//       city: '',
//       state: '',
//       zipCode: ''
//     });
//   }

//   placeOrder() {
//     const order = {
//       items: this.cart.getItems(),
//       ...this.form.value
//     };

//     this.orders.placeOrder(order).subscribe(() => {
//       this.cart.clearCart();
//       this.router.navigate(['/user/orders']);
//     });
//   }
// }
