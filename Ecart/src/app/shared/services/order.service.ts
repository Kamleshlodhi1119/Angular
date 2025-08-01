import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/orders/all`);
  }

  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.put(`http://localhost:8080/api/orders/${orderId}/status`, { status });
  }

  placeOrder(order: any) {
    return this.http.post('http://localhost:8080/api/orders', order, { withCredentials: true });
  }

  getOrdersByCustomer(customerId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/orders/customer/${customerId}`);
  }

  getUserOrders(customerId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/orders/customer/${customerId}`, { withCredentials: true });
  }
}
