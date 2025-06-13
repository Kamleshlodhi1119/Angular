import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    // If currentUser is already set, skip session check
    if (this.authService.currentUser) {
      return of(true);
    }

    // Otherwise, validate session from backend
    return this.authService.checkSession().pipe(
      switchMap(user => {
        if (user) {
          return of(true);
        } else {
          return of(this.router.createUrlTree(['/login']));
        }
      }),
      catchError(() => of(this.router.createUrlTree(['/login'])))
    );
  }
}
