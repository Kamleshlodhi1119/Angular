import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
// import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderItemComponent } from '../../components/order-item/order-item.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login', 
 
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
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

  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     this.authService.adminLogin(this.loginForm.value).subscribe({
  //       next: () => this.router.navigate(['/admin/dashboard']),
  //       error: err => {
  //         this.errorMessage = err.error?.message || 'Login failed';
  //       }
  //     });
  //   }
  // }


  // this is for test
  // onSubmit(): void {
  //   const testCredentials = {
  //     email: "admin123@gmail.com",
  //     password: "password123"
  //   };
    
  //   this.authService.adminLogin(testCredentials).subscribe({
  //     next: () => this.router.navigate(['/admin/dashboard']),
  //     error: (err) => console.error('Hardcoded login error:', err)
  //   });
  // }
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.adminLogin(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login response:', response);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Login error:', err);
          // Handle both JSON and text errors
          if (err.error && err.error.text) {
            this.errorMessage = err.error.text;
          } else if (err.message) {
            this.errorMessage = err.message;
          } else {
            this.errorMessage = 'Login failed';
          }
        }
      });
    }
  }
}
