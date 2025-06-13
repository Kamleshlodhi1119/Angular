import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';
import { CartService } from 'src/app/shared/services/cart.service';
import { CartItem } from 'src/app/shared/models/cart.model';
import { UserSessionService } from 'src/app/shared/services/user-session.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  error = '';
  currentUser: User | null = null;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private userSession: UserSessionService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userSession.getCustomer(); // ✅ Get user session

    this.productService.getActiveProducts().subscribe({
      next: (res) => this.products = res,
      error: () => this.error = 'Failed to load products.'
    });
  }

  handleAddToCart(product: Product) {
    if (!this.currentUser) {
      alert('Please login to add items to cart.');
      return;
    }

    const cartItem: CartItem = {
      productId: product.id,
      customerId: this.currentUser.id, // ✅ Dynamic ID
      customerEmail: this.currentUser.email, // ✅ Dynamic email
      quantity: 1,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category
    };

    this.cartService.addToCart(cartItem).subscribe({
      next: () => alert('Added to cart'),
      error: () => alert('Product Already In Cart')
    });
  }
}
