import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { OrderItemComponent } from '../../components/order-item/order-item.component';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-view-orders',
 
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {
  orders: any[] = [];
  error: string = '';

  statusOptions = ['CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  constructor(private orderService: OrderService,private alertService: AlertService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (data) => this.orders = data,
      error: () => this.alertService.show('Failed to load orders.','error')
    });
  }

  updateStatus(orderId: number, status: string): void {
    this.orderService.updateOrderStatus(orderId, status).subscribe({
      next: () => this.loadOrders(),
      error: () =>this.alertService.show('Failed to update order status','error')
    });
  }
}
