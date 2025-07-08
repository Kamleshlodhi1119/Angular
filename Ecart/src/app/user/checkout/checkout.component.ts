import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { OrderService } from '../../shared/services/order.service';
import { CartItem } from '../../shared/models/cart.model';
import { UserSessionService } from 'src/app/shared/services/user-session.service';
import { AlertService } from 'src/app/shared/services/alert.service';

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
    private orders: OrderService,private alertService: AlertService
  ) {
    // Initialize form with validators
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
  lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
  email: ['', [Validators.required, Validators.email]],
  phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
  address1: ['', Validators.required],
  address2: [''],
  city: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
  state: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
  zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
  country: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
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
       this.alertService.show('Please complete all required fields in the form.',"warning");
      this.form.markAllAsTouched();
      return;
    }

    const user = this.userSession.getUser();
    if (!user) {
       this.alertService.show('User session expired. Please login again.','error');
      this.router.navigate(['/login']);
      return;
    }

    // Validate cart
    if (this.cartItems.length === 0 || this.total <= 0) {
       this.alertService.show('Your cart is empty or total is ₹0. Please add items before placing an order.','warning');
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
