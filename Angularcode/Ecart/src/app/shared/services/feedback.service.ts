import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl = 'http://localhost:8080/api/feedback';

  constructor(private http: HttpClient) {}

  getAllFeedbacks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  submitFeedback(feedback: any) {
    return this.http.post('http://localhost:8080/api/feedback/submit', feedback, { withCredentials: true });
  }

  getUserFeedbacks() {
    return this.http.get('/api/feedback/user', { withCredentials: true });
 
  }

  
}
