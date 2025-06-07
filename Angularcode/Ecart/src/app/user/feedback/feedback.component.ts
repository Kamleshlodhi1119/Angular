// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { FeedbackService } from '../../shared/services/feedback.service';
// import { OrderService } from '../../shared/services/order.service';

// @Component({
//   selector: 'app-feedback',
//   templateUrl: './feedback.component.html',
//   styleUrls: ['./feedback.component.css']
// })
// export class FeedbackComponent implements OnInit {
//   deliveredProducts: any[] = [];
//   feedbackForm!: FormGroup;
//   showForm = false;
//   selectedProductId!: number;
//   customerId = 38; // Ideally from AuthService

//   constructor(
//     private orderService: OrderService,
//     private feedbackService: FeedbackService,
//     private fb: FormBuilder
//   ) {}

//   ngOnInit(): void {
//     this.feedbackForm = this.fb.group({
//       rating: [5],
//       description: ['']
//     });

//     this.orderService.getOrdersByCustomer(this.customerId).subscribe(orders => {
//       this.deliveredProducts = [];
//       orders
//         .filter((order: any) => order.status === 'CONFIRMED')
//         .forEach((order: any) => {
//           order.items.forEach((item: any) => {
//             this.deliveredProducts.push({
//               productId: item.productId,
//               orderDate: order.orderDate
//             });
//           });
//         });
//     });
//   }

//   openFeedback(productId: number) {
//     this.selectedProductId = productId;
//     this.showForm = true;
//   }

//   submitFeedback() {
//     const payload = {
//       productId: this.selectedProductId,
//       customerId: this.customerId,
//       rating: this.feedbackForm.value.rating,
//       description: this.feedbackForm.value.description
//     };

//     this.feedbackService.submitFeedback(payload).subscribe(() => {
//       alert('Feedback submitted successfully!');
//       this.feedbackForm.reset();
//       this.showForm = false;
//     });
//   }
// }



import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { ProductService } from '../../shared/services/product.service';
import { FeedbackService } from '../../shared/services/feedback.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  deliveredProducts: any[] = [];
  selectedProductId!: number;
  feedbackForm!: FormGroup;
  showForm = false;
  customerId = 38; // 🔁 Replace with dynamic auth logic if available

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private feedbackService: FeedbackService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      rating: [''],
      description: ['']
    });

    this.loadDeliveredProductDetails();
  }

  closeForm(): void {
    this.showForm = false;
    this.feedbackForm.reset();
  }
  
  loadDeliveredProductDetails(): void {
    this.orderService.getOrdersByCustomer(this.customerId).subscribe(orders => {
      const productIds = new Set<number>();
      orders
        .filter(order => order.status === 'CONFIRMED')
        .forEach(order => {
          order.items.forEach((item: any) => {
            if (!productIds.has(item.productId)) {
              productIds.add(item.productId);
              this.productService.getProductById(item.productId).subscribe(product => {
                this.deliveredProducts.push(product);
              });
            }
          });
        });
    });
  }

  openFeedbackForm(productId: number): void {
    this.selectedProductId = productId;
    this.showForm = true;
  }

  submitFeedback(): void {
    const feedback = {
      customerId: this.customerId,
      productId: this.selectedProductId,
      ...this.feedbackForm.value
    };

    this.feedbackService.submitFeedback(feedback).subscribe(() => {
      alert('Feedback submitted successfully!');
      this.feedbackForm.reset();
      this.showForm = false;
    });
  }
}
