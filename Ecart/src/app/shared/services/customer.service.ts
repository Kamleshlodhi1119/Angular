import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'http://localhost:8080/admin/customers';
   private readonly API_URL = 'http://localhost:8080/api/auth/customers';


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

   getCustomerProfile(): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/profile`, { withCredentials: true });
  }

  updateCustomerProfile(data: User): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/profile`, data, { withCredentials: true });
  }
}
