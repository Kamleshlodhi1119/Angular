import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { UserSessionService } from 'src/app/shared/services/user-session.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(
    private orderService: OrderService,
    private userSession: UserSessionService,private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const customerId = this.userSession.getUserId();
    if (customerId) {
      this.orderService.getUserOrders(customerId).subscribe({
        next: orders => this.orders = orders,
        error: err =>  this.alertService.show('Error fetching orders', 'error')
      });
    } else {
       this.alertService.show('Customer ID not found in session','error');
    }
  }
}
