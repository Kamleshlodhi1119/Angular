import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { OrderItemComponent } from '../../components/order-item/order-item.component';

// @Component({
//   selector: 'app-profile',
//   imports: [],
//   templateUrl: './profile.component.html',
//   styleUrl: './profile.component.css'
// })
// export class ProfileComponent {

// }
@Component({ 
  selector: 'app-profile',
  templateUrl: './profile.component.html', 
  styleUrls: ['./profile.component.css'] })
export class ProfileComponent implements OnInit {
  profile: any;
  constructor(private http: HttpClient) {}
  ngOnInit() { this.http.get('http://localhost:8080/api/customers/profile', { withCredentials: true }).subscribe(p => this.profile = p); }
}
