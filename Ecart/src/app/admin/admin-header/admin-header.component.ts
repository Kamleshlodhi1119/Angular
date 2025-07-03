import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
   constructor(public authService: AuthService, private router: Router) {}
  logout(): void {
    this.authService.adminLogout().subscribe(() => {
      this.router.navigate(['/admin-login']);
    });
  }
}
