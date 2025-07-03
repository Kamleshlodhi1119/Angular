import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl = 'http://localhost:8080/api/feedback';

  constructor(private http: HttpClient) {}

  getAllFeedbacks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  getUserFeedbacks(customerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${customerId}`, { withCredentials: true });
  }

  submitFeedback(feedback: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, feedback);
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:8080/api/products/${productId}`);
  }
}
