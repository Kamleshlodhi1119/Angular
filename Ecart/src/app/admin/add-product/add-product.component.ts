import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { OrderItemComponent } from '../../components/order-item/order-item.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm: FormGroup;
  selectedFile: File | null = null;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,private alertService: AlertService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value).subscribe({
        next: (createdProduct) => {
          if (this.selectedFile) {
            this.productService.uploadImage(createdProduct.id, this.selectedFile).subscribe({
              next: () => {
                this.alertService.show( 'Product created successfully with image!','success');
                this.productForm.reset();
              },
              error: (err) => {
  console.error(err);
  this.errorMessage = err?.error || 'Image upload failed';
              }
            });
          } else {
            this.alertService.show('Product created successfully (no image)',"success");
            this.productForm.reset();
          }
        },
        error: () => this.errorMessage = 'Failed to create product'
      });
    }
  }
}
