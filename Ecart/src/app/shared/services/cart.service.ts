import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  clearCart(email: string): Observable<void> { 
  const params = new HttpParams().set('customerEmail', email);
  return this.http.delete<void>('http://localhost:8080/cart/clearCart', { params, responseType: 'text' as 'json'  });
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

deleteCartItemByProduct(productId: number, email: string): Observable<void> {
  const params = new HttpParams()
    .set('productId', productId.toString())
    .set('customerEmail', email);

  return this.http.delete<void>('http://localhost:8080/cart/delete', { params, responseType: 'text' as 'json'  });
}
  /** Delete cart item */
  // deleteCartItem(id: number): Observable<void> {
  //   return this.http.delete<void>(`http://localhost:8080/cart/delete/${id}`);
  // }
}
