// import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { CartItem } from '../../shared/models/cart.model';
// import { CommonModule } from '@angular/common';
// import { OrderItemComponent } from '../order-item/order-item.component';
// import { ProductCardComponent } from '../product-card/product-card.component';

// @Component({
//   selector: 'app-cart-item',
 
//   templateUrl: './cart-item.component.html',
//   styleUrls: ['./cart-item.component.css']
  
// })
// export class CartItemComponent {
//   @Input() item!: CartItem;
//   @Output() remove = new EventEmitter<number>();
//   @Output() quantityChange = new EventEmitter<{ productId: number, quantity: number }>();

//   updateQuantity(qty: string): void {
//     const newQty = parseInt(qty, 10);
//     if (newQty > 0) {
//       this.quantityChange.emit({ productId: this.item.productId, quantity: newQty });
//     }
//   }
// }
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../../shared/models/cart.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input() item!: CartItem;
  @Output() remove =new EventEmitter<{ productId: number, customerEmail: string }>();
//  new EventEmitter<{ productId: number, customerEmail: string }>();
  @Output() quantityChange = new EventEmitter<{ productId: number, customerEmail: string, quantity: number }>();

  incrementQuantity() {
    this.quantityChange.emit({
      productId: this.item.productId,
      customerEmail: this.item.customerEmail,
      quantity: this.item.quantity + 1
    });
  }

  decrementQuantity() {
    const newQty = this.item.quantity - 1;
    if (newQty <= 0) {
      this.remove.emit({
        productId: this.item.productId,
        customerEmail: this.item.customerEmail
      });
    } else {
      this.quantityChange.emit({
        productId: this.item.productId,
        customerEmail: this.item.customerEmail,
        quantity: newQty
      });
    }
  }
  removeitem() {
    const newQty = this.item.quantity - 1;
    if (newQty <= 0) {
      this.remove.emit({
        productId: this.item.productId,
        customerEmail: this.item.customerEmail
      });
    } else {
      this.quantityChange.emit({
        productId: this.item.productId,
        customerEmail: this.item.customerEmail,
        quantity: newQty
      });
    }
  }
}
