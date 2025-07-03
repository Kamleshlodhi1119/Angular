export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  active: boolean;
  imageUrl?: string;  // relative path or null
}
