import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../shared/services/dashboard.service';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-admin-dashboard',
   templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
   products: Product[] = [];
  summary: any = {};
  topProducts: any[] = [];
  error: string = '';

  constructor(private dashboardService: DashboardService, private alertService: AlertService,  private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchDashboardData();

     this.productService.getActiveProducts().subscribe({
      next: (res) => (this.products = res),
      error: () => this.alertService.show('Failed to load products.','error')
    }); 
  }

  fetchDashboardData(): void {
    this.dashboardService.getSummary().subscribe({
      next: res => this.summary = res,
      error: err =>  this.alertService.show('Failed to load dashboard summary.','error')
    });

    this.dashboardService.getTopProducts().subscribe({
      next: res => this.topProducts = res,
      error: err => console.error('Top products error:', err)
    });
  }
}
