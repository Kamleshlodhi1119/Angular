import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Order } from '../../shared/models/order.model';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-order-item',
  
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent {
  @Input() order!: Order;
}
