import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UserSessionService {
  getCustomer() {
    return this.authService.getCurrentUser();
    //  throw new Error('Method not implemented.');
  }
  constructor(private authService: AuthService) {}

  getUser(): User | null {
    return this.authService.getCurrentUser();
  }

  getUserId(): number | null {
    const user = this.getUser();
    return user ? user.id : null;
  }

  getUserEmail(): string | null {
    const user = this.getUser();
    return user ? user.email : null;
  }

  getUserName(): string | null {
    const user = this.getUser();
    return user ? user.name : null;
  }

  // Add more helpers as needed
}
