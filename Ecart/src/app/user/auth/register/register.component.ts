import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';

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
    private router: Router,private alertService: AlertService
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        address1: [''],
        city: ['', [Validators.pattern(/^[A-Za-z\s]*$/)]],
        state: ['', [Validators.pattern(/^[A-Za-z\s]*$/)]],
        zipCode: ['', [Validators.pattern(/^\d{5,6}$/)]],
        country: ['India']
      },
      { validators: this.passwordMatchValidator }
    );


  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { confirmPassword, ...formData } = this.registerForm.value; // Remove confirmPassword before sending
      this.authService.registerCustomer(formData).subscribe({
        next: () => {
          this.alertService.show('Registration successful!','success'),
          this.registerForm.reset();
          this.router.navigate(['/user/auth/login']);
        },
        error: err => {
          this.errorMessage = err.error?.message ||  this.alertService.show('Registration failed','error');
        }
      });
    } else {
       this.alertService.show('Please fix form errors before submitting.','error'),
      this.errorMessage = 'Please fix form errors before submitting.';
    }
  }
}
