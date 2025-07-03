// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-register',
//   imports: [],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.css'
// })
// export class RegisterComponent {

// }

import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', Validators.required],
      address1: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      country: ['India']
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.registerCustomer(this.registerForm.value).subscribe({
        next: () => {
          this.successMessage = 'Registration successful!';
          this.registerForm.reset();
          this.router.navigate(['/user/auth/login']);
        },
        error: err => this.errorMessage = err.error?.message || 'Registration failed'
      });
    }
  }
}
