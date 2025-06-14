import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // ✅ Inject HttpClient here
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products/allitems');
  }
  
  toggleProductStatus(productId: number): Observable<any> {
    return this.http.put(`http://localhost:8080/api/products/toggle-status/${productId}`, {});
  }

  addProduct(productData: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/products/additems', productData);
  }
  
  uploadImage(productId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post(`http://localhost:8080/api/products/${productId}/upload-image`, formData);
    // return this.http.post(`http://localhost:8080/api/products/2/upload-image`, formData);

  }
  

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:8080/api/products/${productId}`);
  }
  
  

  // getProductById(productId: number): Observable<any> {
  //   return this.http.get(`http://localhost:8080/api/products/5`);
  // }


  updateProduct(productId: number, productData: any): Observable<any> {
    return this.http.post(`http://localhost:8080/api/products/additems`, {
      id: productId,
      ...productData
    });
  }
  
deleteProduct(productId: number): Observable<any> {
  return this.http.delete(`http://localhost:8080/api/products/delete/${productId}`);
}


  getActiveProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products');
  }
  
  searchProducts(query: string) {
    return this.http.get<Product[]>(`http://localhost:8080/api/products/search?query=${encodeURIComponent(query)}`);
  }
  
}
