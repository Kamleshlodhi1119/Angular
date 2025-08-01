import { Product } from './product.model';

export interface OrderItem {
  productId(productId: any): unknown;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: string;
  status: 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  orderDate: string; // ISO string format
}
