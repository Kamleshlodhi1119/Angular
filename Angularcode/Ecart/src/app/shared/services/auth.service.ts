// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable, catchError, map, throwError } from 'rxjs';
// // import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private apiUrl = 'http://localhost:8080/api/auth';

//   constructor(private http: HttpClient, private router: Router) {}

//   adminLogin(credentials: { email: string; password: string }): Observable<any> {
//     return this.http.post(
//       `http://localhost:8080/admin/admin-login`,
//       credentials,
//       {
//         withCredentials: true,
//         responseType: 'text' // Accept text response
//       }
//     ).pipe(
//       map(response => {
//         if (response.includes('success')) {
//           return { success: true };
//         }
//         throw new Error(response);
//       }),
//       catchError(err => {
//         console.error('Login error:', err);
//         return throwError(() => err);
//       })
//     );
//   }
//   // ✅ Admin logout
//   adminLogout(): Observable<any> {
//     return this.http.post(`http://localhost:8080/admin/admin-logout`, {}, {
//       withCredentials: true
//     });
//   }

//   // ✅ Check if admin is logged in (ping backend session)
//   isAdminAuthenticated(): Observable<boolean> {
//     return this.http.get<{ authenticated: boolean }>(`http://localhost:8080/admin/check-admin`, {
//       withCredentials: true
//     }).pipe(map(res => res.authenticated));
//   }
  

//   // Optional: redirect if not logged in
//   logoutAndRedirect(): void {
//     this.adminLogout().subscribe(() => {
//       this.router.navigate(['/admin/admin-login']);
//     });
//   }


//   customerLogin(credentials: { email: string; password: string }): Observable<any> {
//     return this.http.post('http://localhost:8080/api/auth/login', credentials, {
//       withCredentials: true
//     });
//   }

//   registerCustomer(data: any): Observable<any> {
//     return this.http.post('http://localhost:8080/api/auth/register', data, {
//       withCredentials: true
//     });
//   }


//   customerLogout() {
//     return this.http.post('/api/auth/logout', {}, { withCredentials: true });
//   }

//   isCustomerAuthenticated(): Observable<boolean> {
//     return this.http.get<{ authenticated: boolean }>('/api/auth/check-customer', { withCredentials: false })
//       .pipe(map(res => res.authenticated));
//   }

// }
// File: src/app/shared/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly ADMIN_API = 'http://localhost:8080/admin';
  private readonly USER_API = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

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
    return this.http.post(`${this.ADMIN_API}/admin-logout`, {}, { withCredentials: true, responseType: 'text'});
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
    this.adminLogout().subscribe(() => this.router.navigate(['/admin/admin-login']));
  }

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
}
