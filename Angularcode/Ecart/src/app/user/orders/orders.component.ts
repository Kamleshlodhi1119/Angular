import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { UserSessionService } from 'src/app/shared/services/user-session.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(
    private orderService: OrderService,
    private userSession: UserSessionService
  ) {}

  ngOnInit(): void {
    const customerId = this.userSession.getUserId();
    if (customerId) {
      this.orderService.getUserOrders(customerId).subscribe({
        next: orders => this.orders = orders,
        error: err => console.error('Error fetching orders', err)
      });
    } else {
      console.error('Customer ID not found in session');
    }
  }
}
