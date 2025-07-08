import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../../shared/services/customer.service';
import { User } from '../../../shared/models/user.model';
import { AlertService } from 'src/app/shared/services/alert.service';

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
    private customerService: CustomerService,
    private router: Router,private alertService: AlertService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.customerLogin(this.loginForm.value).subscribe({
        next: () => {
          // After login, fetch the logged-in user's profile
          this.customerService.getCustomerProfile().subscribe({
            next: (user: User) => {
              this.authService.setCurrentUser(user);
              this.router.navigate(['/user/profile']);
            },
            error: () => {
              this.alertService.show('Login succeeded, but failed to load user profile.','warning');
              this.router.navigate(['/user/profile']); // fallback navigation
            }
          });
          this.authService.checkSession().subscribe(user => {
    if (user) {
      this.authService.setCurrentUser(user);
    }
  });
        },
        error: err => {
          this.errorMessage = err.error?.message || this.alertService.show('Login failed','error');
        }
      });
    }
  }
}
