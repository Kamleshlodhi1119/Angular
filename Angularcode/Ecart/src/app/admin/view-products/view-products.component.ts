import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';
// import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { OrderItemComponent } from '../../components/order-item/order-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-products',
  
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  products: Product[] = [];
  error: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => this.products = data,
      error: () => this.error = 'Failed to load products.'
    });
  }

  toggleStatus(productId: number): void {
    this.productService.toggleProductStatus(productId).subscribe({
      next: () => this.loadProducts(),
      error: () => alert('Failed to update product status.')
    });
  }

  editProduct(productId: number): void {
    this.router.navigate(['products/update/', productId]);
  }
}
