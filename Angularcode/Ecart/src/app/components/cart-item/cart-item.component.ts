import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../../shared/models/cart.model';
import { CommonModule } from '@angular/common';
import { OrderItemComponent } from '../order-item/order-item.component';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-cart-item',
 
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
  
})
export class CartItemComponent {
  @Input() item!: CartItem;
  @Output() remove = new EventEmitter<number>();
  @Output() quantityChange = new EventEmitter<{ productId: number, quantity: number }>();

  updateQuantity(qty: string): void {
    const newQty = parseInt(qty, 10);
    if (newQty > 0) {
      // this.quantityChange.emit({ productId: this.item.product.id, quantity: newQty });
    }
  }
}
