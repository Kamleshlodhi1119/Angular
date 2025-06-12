// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { Observable, catchError, map, throwError } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private readonly ADMIN_API = 'http://localhost:8080/admin';
//   private readonly USER_API = 'http://localhost:8080/api/auth';

//   constructor(private http: HttpClient, private router: Router) {}

//   adminLogin(credentials: { email: string; password: string }): Observable<any> {
//     return this.http.post(`${this.ADMIN_API}/admin-login`, credentials, {
//       withCredentials: true,
//       responseType: 'text'
//     }).pipe(
      
//       map(response => {
//         if (response.includes('success')) return { success: true };
//         throw response;
//       }),
      
//       catchError(err => throwError(() => err))
//     );
//   }

//   adminLogout(): Observable<any> {
//     return this.http.post(`${this.ADMIN_API}/admin-logout`, {}, { withCredentials: true, responseType: 'text'});
//   }

//   isAdminAuthenticated(): Observable<boolean> {
//     return this.http.get<{ authenticated: boolean }>(`${this.ADMIN_API}/check-admin`, {
//       withCredentials: true
//     }).pipe(
//       map(res => res.authenticated),
//       catchError(() => [false])
//     );
//   }

//   logoutAndRedirect(): void {
//     this.adminLogout().subscribe(() => this.router.navigate(['/admin/admin-login']));
//   }

//   customerLogin(credentials: { email: string; password: string }): Observable<any> {
//     return this.http.post(`${this.USER_API}/login`, credentials, { withCredentials: true });
//   }

//   registerCustomer(data: any): Observable<any> {
//     return this.http.post(`${this.USER_API}/register`, data, { withCredentials: true });
//   }

//   customerLogout(): Observable<any> {
//     return this.http.post(`${this.USER_API}/logout`, {}, { withCredentials: true });
//   }

//   isCustomerAuthenticated(): Observable<boolean> {
//     return this.http.get<{ authenticated: boolean }>(`${this.USER_API}/check-customer`, {
//       withCredentials: true
//     }).pipe(
//       map(res => res.authenticated),
//       catchError(() => [false])
//     );
//   }
// }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly ADMIN_API = 'http://localhost:8080/admin';
  private readonly USER_API = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  // Admin session APIs remain unchanged
  adminLogin(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.ADMIN_API}/admin-login`, credentials, {
      withCredentials: true,
      responseType: 'text'
    }).pipe(
      map(response => {
        if (response.includes('success')) return { success: true };
        throw response;
      }),
      catchError(err => throwError(() => err))
    );
  }

  adminLogout(): Observable<any> {
    return this.http.post(`${this.ADMIN_API}/admin-logout`, {}, {
      withCredentials: true,
      responseType: 'text'
    });
  }

  isAdminAuthenticated(): Observable<boolean> {
    return this.http.get<{ authenticated: boolean }>(`${this.ADMIN_API}/check-admin`, {
      withCredentials: true
    }).pipe(
      map(res => res.authenticated),
      catchError(() => [false])
    );
  }

  logoutAndRedirect(): void {
    this.adminLogout().subscribe(); // Keep admin redirect logic in component
  }

  // Customer session APIs
  customerLogin(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.USER_API}/login`, credentials, { withCredentials: true });
  }

  registerCustomer(data: any): Observable<any> {
    return this.http.post(`${this.USER_API}/register`, data, { withCredentials: true });
  }

  customerLogout(): Observable<any> {
    return this.http.post(`${this.USER_API}/logout`, {}, { withCredentials: true });
  }

  isCustomerAuthenticated(): Observable<boolean> {
    return this.http.get<{ authenticated: boolean }>(`${this.USER_API}/check-customer`, {
      withCredentials: true
    }).pipe(
      map(res => res.authenticated),
      catchError(() => [false])
    );
  }

  getCustomerProfile(): Observable<User> {
    return this.http.get<User>(`${this.USER_API}/customers/profile`, { withCredentials: true });
  }

  updateCustomerProfile(customer: User): Observable<User> {
    return this.http.put<User>(`${this.USER_API}/customers/profile`, customer, { withCredentials: true });
  }
}