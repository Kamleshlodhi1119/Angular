import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-view-products',
  
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  products: Product[] = [];
  error: string = '';

  constructor(private productService: ProductService, private router: Router,private alertService: AlertService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => this.products = data,
      error: () => this.alertService.show('Failed to load products.', 'error') //this.error = 'Failed to load products.'
    });
  }

  toggleStatus(productId: number): void {
    this.productService.toggleProductStatus(productId).subscribe({
      next: () => this.loadProducts(),
      error: () => this.alertService.show('Failed to update product status.','error')
    });
  }

  editProduct(productId: number): void {
    // this.router.navigate(['products/update/', productId]);
    this.router.navigate(['admin/products/update', productId]);
  }
   deleteProduct(productId: number): void {
     this.productService.deleteProduct(productId).subscribe({
      next: () => this.loadProducts(),
      error: () => this.alertService.show('Failed to Delete product.','error')
    });
  }
}
