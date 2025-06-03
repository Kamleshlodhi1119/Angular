// import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { Product } from '../../shared/models/product.model';

// @Component({
//   selector: 'app-product-card',
//   templateUrl: './product-card.component.html',
//   styleUrls: ['./product-card.component.css']
// })
// export class ProductCardComponent {
//   @Input() product!: Product;
//   @Output() addToCart = new EventEmitter<Product>();

//   // onAddToCartClick() {
//   //   this.addToCart.emit(this.product);
//   // }
//   onAddToCartClick() {
//     console.log('Button clicked for:', this.product);
//     this.addToCart.emit(this.product);
//   }
  
// }

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from 'src/app/shared/models/cart.model';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();
  cartService: any;

  onAddToCart() {
    this.addToCart.emit(this.product);
  }
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
