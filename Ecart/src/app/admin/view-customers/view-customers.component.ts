import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/services/customer.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-view-customers',
 
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.css']
})
export class ViewCustomersComponent implements OnInit {
  customers: any[] = [];
  error: string = '';

  constructor(private customerService: CustomerService,private alertService: AlertService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (data) => this.customers = data,
      error: () => this.alertService.show('Failed to load customer data.','error')
    });
  }

  toggleStatus(customerId: number): void {
    this.customerService.toggleCustomerStatus(customerId).subscribe({
      next: () => this.loadCustomers(),
      error: () => this.alertService.show('Failed to toggle status','error')
    });
  }

  deleteCustomer(customerId: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(customerId).subscribe({
        next: () => this.loadCustomers(),
        error: () => this.alertService.show('Failed to delete customer','error')
      });
    }
  }
}
