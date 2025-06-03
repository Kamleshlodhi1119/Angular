// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   imports: [],
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.css'
// })
// export class HomeComponent {

// }

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';
import { CartService } from 'src/app/shared/services/cart.service';
import { CartItem } from 'src/app/shared/models/cart.model';

@Component({
  selector: 'app-home',
 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  error = '';
  // cartService: any;

  
  constructor(private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getActiveProducts().subscribe({
      next: (res) => this.products = res,
      error: () => this.error = 'Failed to load products.'
    });
  }
  // handleAddToCart(product: Product) {
  //   if (!this.cartService) {
  //     console.error('CartService not available');
  //     return;
  //   }
  //   this.cartService.addToCart(product);
  // }
  handleAddToCart(product: Product) {
    const cartItem: CartItem = {
      productId: product.id,
      customerId: 38, // ❗ Replace with actual logged-in user ID
      customerEmail: 'k@gmail.com', // ❗ Replace with dynamic email
      quantity: 1,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category
    };
  
    this.cartService.addToCart(cartItem).subscribe({
      next: () => alert('Added to cart'),
      error: () => alert('Failed to add to cart')
    });
  }
  
  
  
}
