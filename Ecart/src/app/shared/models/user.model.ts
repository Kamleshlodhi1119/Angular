export interface User {
  profileImageUrl: string;
    id: number;
  name: string;
  email: string;
  password?: string;
  phoneNumber: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  active: boolean;
  }
  