import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
// import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  // ✅ Admin login
  // adminLogin(credentials: { email: string; password: string }): Observable<any> {
  //   // return this.http.post(`${this.apiUrl}/login`, credentials, {
  //     return this.http.post(`http://localhost:8080/admin/admin-login`, credentials, {
  //     withCredentials: true
  //   });
  // }
  adminLogin(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(
      `http://localhost:8080/admin/admin-login`,
      credentials,
      {
        withCredentials: true,
        responseType: 'text' // Accept text response
      }
    ).pipe(
      map(response => {
        if (response.includes('success')) {
          return { success: true };
        }
        throw new Error(response);
      }),
      catchError(err => {
        console.error('Login error:', err);
        return throwError(() => err);
      })
    );
  }
  // adminLogin(credentials: { email: string; password: string }): Observable<any> {
  //   return this.http.post(
  //     `http://localhost:8080/admin/admin-login`,
  //     credentials,
  //     {
  //       withCredentials: true,
  //       responseType: 'text' // Explicitly expect text response
  //     }
  //   ).pipe(
  //     map(response => {
  //       // Handle successful text response
  //       if (response === 'Login successful!') {
  //         return { success: true, message: response };
  //       }
  //       throw new Error(response);
  //     }),
  //     catchError(err => {
  //       console.error('Login error:', err);
  //       return throwError(() => err);
  //     })
  //   );
  // }
  // ✅ Admin logout
  adminLogout(): Observable<any> {
    return this.http.post(`http://localhost:8080/admin/admin-logout`, {}, {
      withCredentials: true
    });
  }

  // ✅ Check if admin is logged in (ping backend session)
  isAdminAuthenticated(): Observable<boolean> {
    return this.http.get<{ authenticated: boolean }>(`http://localhost:8080/admin/check-admin`, {
      withCredentials: true
    }).pipe(map(res => res.authenticated));
  }
  

  // Optional: redirect if not logged in
  logoutAndRedirect(): void {
    this.adminLogout().subscribe(() => {
      this.router.navigate(['/admin/admin-login']);
    });
  }


  customerLogin(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/login', credentials, {
      withCredentials: true
    });
  }

  registerCustomer(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/register', data, {
      withCredentials: true
    });
  }
  
  // customerLogin(data: any) {
  //   return this.http.post('/api/auth/customer-login', data, { withCredentials: true });
  // }

  customerLogout() {
    return this.http.post('/api/auth/logout', {}, { withCredentials: true });
  }

  isCustomerAuthenticated(): Observable<boolean> {
    return this.http.get<{ authenticated: boolean }>('/api/auth/check-customer', { withCredentials: false })
      .pipe(map(res => res.authenticated));
  }

  // registerCustomer(data: any) {
  //   return this.http.post('/api/auth/register', data, { withCredentials: true });
  // }


}

