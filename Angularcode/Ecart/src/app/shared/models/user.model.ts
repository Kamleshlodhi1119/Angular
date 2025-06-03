export interface User {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    active: boolean;
  }
  