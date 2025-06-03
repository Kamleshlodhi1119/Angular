import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { OrderItemComponent } from '../../components/order-item/order-item.component';

// @Component({
//   selector: 'app-orders',
//   imports: [],
//   templateUrl: './orders.component.html',
//   styleUrl: './orders.component.css'
// })
// export class OrdersComponent {

// }

@Component({ selector: 'app-orders', 
  templateUrl: './orders.component.html', 
  styleUrls: ['./orders.component.css'] })
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  
  constructor(private orderService: OrderService) {}
  ngOnInit() { this.orderService.getUserOrders().subscribe(o => this.orders = o); }
}