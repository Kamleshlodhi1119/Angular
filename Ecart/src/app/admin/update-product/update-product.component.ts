import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';

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
    private router: Router,private alertService: AlertService
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
      error: () => this.alertService.show('Failed to load product data','error')
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
              next: () =>this.alertService.show( 'Product updated and image uploaded!','success'),
              error: () =>this.alertService.show('Image upload failed','error')
            });
          } else {
            this.alertService.show('Product updated successfully','success');
          }
        },
        error: () => this.alertService.show( 'Failed to update product','error')
      });
    }
  }
}
