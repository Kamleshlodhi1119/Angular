// import { Product } from './product.model';

// export interface CartItem {
//   product: Product;
//   quantity: number;
// }

export interface CartItem {
  id?: number;
  productId: number;
  customerId: number;
  customerEmail: string;
  quantity: number;
  name: string;
  description: string;
  price: number;
  category: string;
}
