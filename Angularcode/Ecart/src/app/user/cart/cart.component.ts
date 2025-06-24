import { Component } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { CartItem } from 'src/app/shared/models/cart.model';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/app/shared/services/user-session.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  items: CartItem[] = [];
  total = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
    private userSession: UserSessionService
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  private loadCart(): void {
    const email = this.userSession.getUserEmail();
    if (!email) {
      console.error('User not logged in');
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.getCartItems(email).subscribe(data => {
      this.items = data;
      this.calculateTotal();
    });
  }

  remove({ productId, customerEmail }: { productId: number; customerEmail: string }): void {
    this.cartService.deleteCartItemByProduct(productId, customerEmail).subscribe(() => {
      this.loadCart(); // Refresh cart after deletion
    });
  }

clearCart(): void {
  const email = this.userSession.getUserEmail();
  if (!email) {
    console.error('User not logged in');
    this.router.navigate(['/login']);
    return;
  }

  this.cartService.clearCart(email).subscribe(() => {
    this.loadCart(); // Reload cart after clearing
  });
}

  change({ productId, customerEmail, quantity }: { productId: number; customerEmail: string; quantity: number }): void {
    this.cartService.updateCartItemQuantity(productId, customerEmail, quantity).subscribe(() => {
      this.loadCart(); // Refresh cart after quantity change
    });
  }

  private calculateTotal(): void {
    this.total = this.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  }

  goToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
