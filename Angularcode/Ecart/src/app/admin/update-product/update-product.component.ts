import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
 
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  productForm!: FormGroup;
  productId!: number;
  selectedFile: File | null = null;
  errorMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadProductData();
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  loadProductData(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (product) => this.productForm.patchValue(product),
      error: () => this.errorMessage = 'Failed to load product data'
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.productService.updateProduct(this.productId, this.productForm.value).subscribe({
        next: () => {
          if (this.selectedFile) {
            this.productService.uploadImage(this.productId, this.selectedFile).subscribe({
              next: () => this.successMessage = 'Product updated and image uploaded!',
              error: () => this.errorMessage = 'Image upload failed'
            });
          } else {
            this.successMessage = 'Product updated successfully';
          }
        },
        error: () => this.errorMessage = 'Failed to update product'
      });
    }
  }
}
