import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserSessionService } from 'src/app/shared/services/user-session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // customerId = 38;
  customer: any = null;
  isEditMode = false;

  constructor(private http: HttpClient,  private userSession: UserSessionService // ✅ inject user session service
) {}

  ngOnInit(): void {
    const costomerId=this.userSession.getUserId();
    const url = `http://localhost:8080/api/auth/customers/${costomerId}`;
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
    const costomerId=this.userSession.getUserId();
    const updateUrl = `http://localhost:8080/api/auth/customers/update/${costomerId}`;
    this.http.put(updateUrl, this.customer).subscribe({
      next: (response) => {
        console.log('Customer updated:', response);
        this.isEditMode = false;
      },
      error: (err) => console.error('Update failed', err)
    });
  }


  showAccountInfo: boolean = true;
showPasswordForm: boolean = false;

toggleToPasswordForm() {
  this.showAccountInfo = false;
  this.showPasswordForm = true;
}

toggleToAccountInfo() {
  this.showAccountInfo = true;
  this.showPasswordForm = false;
}

}
