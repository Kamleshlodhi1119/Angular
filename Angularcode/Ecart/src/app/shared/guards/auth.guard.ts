// // src/app/shared/guards/auth.guard.ts
// import { Injectable } from '@angular/core';
// // import { CanActivate, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { AuthService } from '../services/auth.service';
// import { CanActivate, Router } from '@angular/router';

// @Injectable({ providedIn: 'root' })

//   constructor(private auth: AuthService, private router: Router) {}

//   canActivate(): Observable<boolean> {
//     return this.auth.isCustomerAuthenticated().pipe(
//       tap(authenticated => {
//         if (!authenticated) this.router.navigate(['/user/auth/login']);
//       })
//     );
//   }
// }

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.isCustomerAuthenticated().pipe(
      tap(authenticated => {
        if (!authenticated) this.router.navigate(['/user/auth/login']);
      })
    );
  }
}