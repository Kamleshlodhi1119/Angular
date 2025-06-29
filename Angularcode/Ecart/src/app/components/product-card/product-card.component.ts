import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/shared/models/cart.model';
import { Product } from 'src/app/shared/models/product.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { UserSessionService } from 'src/app/shared/services/user-session.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  constructor(
    private router: Router,
    private cartService: CartService,
    private userSession: UserSessionService,
    private alertService: AlertService
  ) {}

  onAddToCart() {
   const email = this.userSession.getUserEmail();

    if (!email) {
      this.alertService.show('Please login again.');
      // alert('Please login again.');
      return;
    }
    const customerId = this.getCustomerId(); // Replace with actual logic

    const cartItem: CartItem = {
      productId: this.product.id,
      customerId: customerId,
      customerEmail: email,
      quantity: 1,
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      category: this.product.category
    };

    this.cartService.addToCart(cartItem).subscribe({
      next: () => alert('✅ Product added to cart'),
      error: () => alert('❌ Failed to add product to cart')
    });
  }

  viewProduct() {
    this.router.navigate(['/product', this.product.id]);
  }

  addToWishlist() {
    console.log('Added to wishlist:', this.product.id);
    // Wishlist logic can go here
  }

  private getCustomerId(): number {
    // Placeholder: Replace with actual logic from user session or auth service
    return 101; // for example
  }
}
