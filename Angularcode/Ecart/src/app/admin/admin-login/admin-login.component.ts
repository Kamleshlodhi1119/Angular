import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
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

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.adminLogin(this.loginForm.value).subscribe({
        next: (response) => {
          
          console.log('Login response:', response);
          this.router.navigate(['/admin/dashboard']);
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
