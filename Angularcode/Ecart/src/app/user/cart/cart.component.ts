import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { OrderItemComponent } from '../../components/order-item/order-item.component';
import { CartService } from '../../shared/services/cart.service';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';
import { CartItem } from 'src/app/shared/models/cart.model';

// @Component({
//   selector: 'app-cart',
//   imports: [],
//   templateUrl: './cart.component.html',
//   styleUrl: './cart.component.css'
// })
// export class CartComponent {

// }

@Component({ 
  selector: 'app-cart',
 
  templateUrl: './cart.component.html',
   styleUrls: ['./cart.component.css'] })

  //  export class CartComponent {
  //   constructor(public cartService: CartService) { }
  //   get items() { return this.cartService.getItems(); }
  //   get total() { return this.items.reduce((t, i) => t + i.quantity * i.product.price, 0); }
  //   remove(id: number) { this.cartService.removeItem(id); }
  //   change(id: number, qty: number) { this.cartService.updateQuantity(id, qty); }
  // }
  export class CartComponent {
    items: CartItem[] = [];
    total = 0;
  
    constructor(private cartService: CartService) {}
  
    ngOnInit() {
      const email = 'k@gmail.com'; // ⚠️ Replace with logged-in user email
      this.cartService.getCartItems(email).subscribe(data => {
        this.items = data;
        this.total = this.items.reduce((t, i) => t + i.quantity * i.price, 0);
      });
    }
  
    remove(id: number) {
      this.cartService.deleteCartItem(id).subscribe(() => {
        this.items = this.items.filter(i => i.id !== id);
        this.total = this.items.reduce((t, i) => t + i.quantity * i.price, 0);
      });
    }
  
    change(id: number, qty: number) {
      this.cartService.updateCartItem(id, qty).subscribe(updated => {
        const item = this.items.find(i => i.id === updated.id);
        if (item) item.quantity = updated.quantity;
        this.total = this.items.reduce((t, i) => t + i.quantity * i.price, 0);
      });
    }
  }
  