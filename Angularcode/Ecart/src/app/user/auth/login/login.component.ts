// import { Component } from '@angular/core';
// import { AuthService } from '../../../shared/services/auth.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
 
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   loginForm: FormGroup;
//   errorMessage: string = '';

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router
//   ) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required]
//     });
//   }

//   onSubmit(): void {
//     if (this.loginForm.valid) {
//       this.authService.customerLogin(this.loginForm.value).subscribe({
//         next: () => this.router.navigate(['/home']),
//         error: err => this.errorMessage = err.error?.message || 'Login failed'
//       });
//     }
//   }

  
// }
import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.customerLogin(this.loginForm.value).subscribe({
        next: () => this.router.navigate(['/user/profile']),
        error: err => this.errorMessage = err.error?.message || 'Login failed'
      });
    }
  }
}