// import { Injectable } from '@angular/core';
// import { Product } from '../models/product.model';
// import { CartItem } from '../models/cart.model';

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class CartService {

// //   constructor() { }
// // }

// // src/app/shared/services/cart.service.ts
// @Injectable({ providedIn: 'root' })

// export class CartService {
  
//   private items: CartItem[] = [];

//   getItems(): CartItem[] {
//     return this.items;
//   }

//   addItem(product: Product): void {
//     const item = this.items.find(i => i.product.id === product.id);
//     if (item) item.quantity += 1;
//     else this.items.push({ product, quantity: 1 });
//   }
//   addToCart(product: Product): void {
//     const item = this.items.find(i => i.product.id === product.id);
//     if (item) item.quantity += 1;
//     else this.items.push({ product, quantity: 1 });
//   }
  
//   updateQuantity(productId: number, qty: number): void {
//     const item = this.items.find(i => i.product.id === productId);
//     if (item) item.quantity = qty;
//   }

//   removeItem(productId: number): void {
//     this.items = this.items.filter(i => i.product.id !== productId);
//   }

//   clearCart(): void {
//     this.items = [];
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../models/cart.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  getItems //   removeItem(productId: number): void {
    () {
    throw new Error('Method not implemented.');
  }
  clearCart() {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:8080/cart';

  constructor(private http: HttpClient) {}

  /** Add item to cart via backend */
  addToCart(item: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.baseUrl}/add`, item);
  }

  /** Get all cart items for a user */
  getCartItems(email: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.baseUrl}/getcart/${email}`);
  
  }

/** Update cart item quantity by productId and email */
updateCartItemQuantity(productId: number, email: string, quantity: number): Observable<CartItem> {
  return this.http.post<CartItem>(
    `http://localhost:8080/cart/update/quantity`,
    { productId, customerEmail: email, quantity }
  );
}

/** Delete cart item by productId and email */

deleteCartItemByProduct(productId: number, email: string,quantity: number): Observable<void> {
  return this.http.post<void>(
    `http://localhost:8080/cart/update/quantity`,
    { productId, customerEmail: email, quantity }
  );
}







  /** Update cart item quantity */
  updateCartItem(id: number, quantity: number): Observable<CartItem> {
    return this.http.put<CartItem>(`${this.baseUrl}/update/${id}?quantity=${quantity}`, {});
  }

  /** Increase quantity */
  increaseQuantity(id: number, increment: number): Observable<CartItem> {
    return this.http.put<CartItem>(`${this.baseUrl}/increase/${id}?increment=${increment}`, {});
  }

  /** Decrease quantity */
  decreaseQuantity(id: number, decrement: number): Observable<CartItem> {
    return this.http.put<CartItem>(`${this.baseUrl}/decrease/${id}?decrement=${decrement}`, {});
  }

  /** Delete cart item */
  deleteCartItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
