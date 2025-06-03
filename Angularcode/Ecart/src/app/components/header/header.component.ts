import { Component } from '@angular/core';
// import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCardComponent } from '../product-card/product-card.component';
import { OrderItemComponent } from '../order-item/order-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.customerLogout().subscribe(() => {
      this.router.navigate(['/user/auth/login']);
    });
  }
}
