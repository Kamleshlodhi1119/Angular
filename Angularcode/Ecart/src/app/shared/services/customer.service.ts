import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'http://localhost:8080/admin/customers';

  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  toggleCustomerStatus(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/toggle-status/${id}`, {});
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
