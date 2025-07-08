import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/app/shared/services/product.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { UserSessionService } from 'src/app/shared/services/user-session.service';
import { Product } from 'src/app/shared/models/product.model';
import { User } from 'src/app/shared/models/user.model';
import { CartItem } from 'src/app/shared/models/cart.model';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

    products: Product[] = [];
    error = '';
    currentUser: User | null = null;
    productId!: number;
    product: any;
    quantity: number = 1;
  
    constructor(
      private productService: ProductService,
      private cartService: CartService,
      private userSession: UserSessionService,
      private route: ActivatedRoute, 
      private http: HttpClient,
      private alertService: AlertService
    ) {}
  
    ngOnInit(): void {
      this.currentUser = this.userSession.getCustomer(); // ✅ Get user session
  
      this.productService.getActiveProducts().subscribe({
        next: (res) => this.products = res,
        error: () => this.alertService.show('Failed to load products.','error')
      });

       this.productId = Number(this.route.snapshot.paramMap.get('productId'));
    this.loadProduct();
    }
  
    handleAddToCart(product: Product) {
      if (!this.currentUser) {
       this.alertService.show('Please login to add items to cart.','error');
        return;
      }
  
      const cartItem: CartItem = {
        productId: product.id,
        customerId: this.currentUser.id, // ✅ Dynamic ID
        customerEmail: this.currentUser.email, // ✅ Dynamic email
        quantity: 1,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category
      };
  
      this.cartService.addToCart(cartItem).subscribe({
        next: () => this.alertService.show('Added to cart','success'),
        error: () =>this.alertService.show('Product Already In Cart','warning')
      });
    }


  // constructor(private route: ActivatedRoute, private http: HttpClient) {}

  // ngOnInit(): void {
  //   this.productId = Number(this.route.snapshot.paramMap.get('productId'));
  //   this.loadProduct();
  // }

  loadProduct() {
    this.http.get(`http://localhost:8080/api/products/${this.productId}`).subscribe(data => {
      this.product = {
        ...data,
        // hardcoded values for missing data
        sku: 'BO1ODMX8SJ',
        reviews: 10,
        categoryList: ['Milk', 'Cream', 'Fermented'],
        tags: ['Cheese', 'Custard', 'Frozen'],
        imageList: [ // preview images
          'chair1.jpg',
          'chair2.jpg',
          'chair3.jpg',
          'chair4.jpg'
        ],
        fullImage: 'chair1.jpg'
      };
    });
  }

  increment() {
    this.quantity++;
  }

  decrement() {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart() {
    console.log(`Added to cart.`);
  }
}
