import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError, map } from 'rxjs/operators';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAdminAuthenticated().pipe(
      map(authenticated => {
        if (authenticated) return true;
        this.router.navigate(['/admin/login']);
        return false;
      }),
      catchError(() => {
        this.router.navigate(['/admin/login']);
        return of(false);
      })
    );
  }
}
