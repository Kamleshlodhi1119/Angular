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

 // constructor(private cartService: CartService) { }
constructor(
  private cartService: CartService,
  private router: Router,
  private userSession: UserSessionService // ✅ inject user session service
) {}



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
}
