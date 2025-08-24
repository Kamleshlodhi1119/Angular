import { Component } from '@angular/core';
// import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCardComponent } from '../product-card/product-card.component';
import { OrderItemComponent } from '../order-item/order-item.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserSessionService } from 'src/app/shared/services/user-session.service';
import { AlertService } from 'src/app/shared/services/alert.service';
// import { ProfileComponent } from 'src/app/user/profile/profile.component'; 

@Component({
  selector: 'app-header',
 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 customer: any;
 searchQuery = '';
  constructor(private http: HttpClient, private userSession: UserSessionService,private alertService: AlertService,public authService: AuthService, private router: Router) {}
  

  ngOnInit(): void {
    const costomerId=this.userSession.getUserId();
    const url = `http://localhost:8080/api/auth/customers/${costomerId}`;
    this.http.get(url).subscribe({
      next: (data) => {
        this.customer = data;
        this.customer.profileImageUrl = this.customer.profileImageUrl || 'assets/default-profile.png';
      },
      error: (err) =>this.alertService.show('Error loading customer data', 'error')
    });
  }
  
  submitSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/products'], {
        queryParams: { q: this.searchQuery }
      });
    }
  }
  logout(): void {
    this.authService.customerLogout().subscribe(() => {
      this.router.navigate(['/user/auth/login']);
    });
  }
}
