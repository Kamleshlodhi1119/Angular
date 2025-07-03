import { Component } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { ProductService } from '../../shared/services/product.service';

@Component({ 
   selector: 'app-products',
   templateUrl: './products.component.html', 
   styleUrls: ['./products.component.css'] })
export class ProductsComponent {
  query = '';
  products: Product[] = [];
  constructor(private productService: ProductService) {}
  search() {
    this.productService.searchProducts(this.query).subscribe(p => this.products = p);
  }
}
