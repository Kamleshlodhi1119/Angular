import { Component } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { ProductService } from '../../shared/services/product.service';
import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { OrderItemComponent } from '../../components/order-item/order-item.component';

// @Component({
//   selector: 'app-products',
//   imports: [],
//   templateUrl: './products.component.html',
//   styleUrl: './products.component.css'
// })
// export class ProductsComponent {

// }

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
