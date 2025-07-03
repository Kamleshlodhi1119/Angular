// import { CommonModule } from '@angular/common';
// import { Component, Input } from '@angular/core';
// import { Order } from '../../shared/models/order.model';
// import { ProductCardComponent } from '../product-card/product-card.component';

// @Component({
//   selector: 'app-order-item',
  
//   templateUrl: './order-item.component.html',
//   styleUrls: ['./order-item.component.css']
// })
// export class OrderItemComponent {
//   @Input() order!: Order;
// }
import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  @Input() item!: { productId: number, quantity: number, price: number };
  product?: Product;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    if (this.item?.productId) {
      this.productService.getProductById(this.item.productId).subscribe({
        next: (data) => this.product = data,
        error: (err) => console.error(`Product ${this.item.productId} fetch failed`, err)
      });
    }
  }
}
