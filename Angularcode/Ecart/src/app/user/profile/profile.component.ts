import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  customerId = 38;
  customer: any = null;
  isEditMode = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const url = `http://localhost:8080/api/auth/customers/${this.customerId}`;
    this.http.get(url).subscribe({
      next: (data) => {
        this.customer = data;
        this.customer.profileImageUrl = this.customer.profileImageUrl || 'assets/default-profile.png';
      },
      error: (err) => console.error('Error loading customer data', err)
    });
  }

  toggleEdit() {
    this.isEditMode = !this.isEditMode;
  }

  onSubmit() {
    if (!this.isEditMode) return;

    const updateUrl = `http://localhost:8080/api/auth/customers/update/${this.customerId}`;
    this.http.put(updateUrl, this.customer).subscribe({
      next: (response) => {
        console.log('Customer updated:', response);
        this.isEditMode = false;
      },
      error: (err) => console.error('Update failed', err)
    });
  }
}
