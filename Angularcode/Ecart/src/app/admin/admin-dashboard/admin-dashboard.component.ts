import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../shared/services/dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
   templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  summary: any = {};
  topProducts: any[] = [];
  error: string = '';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  fetchDashboardData(): void {
    this.dashboardService.getSummary().subscribe({
      next: res => this.summary = res,
      error: err => this.error = 'Failed to load dashboard summary.'
    });

    this.dashboardService.getTopProducts().subscribe({
      next: res => this.topProducts = res,
      error: err => console.error('Top products error:', err)
    });
  }
}
