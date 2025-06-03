import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'http://localhost:8080/admin/dashboard';

  constructor(private http: HttpClient) {}

  getSummary(): Observable<any> {
    return this.http.get(`${this.baseUrl}/summary`);
  }

  getTopProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/top-products`);
  }
}
