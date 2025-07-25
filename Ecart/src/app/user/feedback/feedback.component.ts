import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { ProductService } from '../../shared/services/product.service';
import { FeedbackService } from '../../shared/services/feedback.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserSessionService } from 'src/app/shared/services/user-session.service';
import { User } from 'src/app/shared/models/user.model';
import { AlertService } from 'src/app/shared/services/alert.service';

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
  currentUser: User | null = null;

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private feedbackService: FeedbackService,
    private fb: FormBuilder,
    private userSession: UserSessionService // ✅ Inject user session service,
    ,private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      rating: [''],
      description: ['']
    });

    this.currentUser = this.userSession.getCustomer(); // ✅ get user from session

    if (this.currentUser) {
      this.loadDeliveredProductDetails(this.currentUser.id); // ✅ pass dynamic id
    } else {
       this.alertService.show('No customer is currently logged in.','error');
    }
  }

  closeForm(): void {
    this.showForm = false;
    this.feedbackForm.reset();
  }

  loadDeliveredProductDetails(customerId: number): void {
    this.orderService.getOrdersByCustomer(customerId).subscribe(orders => {
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
    if (!this.currentUser) {
       this.alertService.show('User not logged in','error');
      return;
    }

    const feedback = {
      customerId: this.currentUser.id, // ✅ dynamic ID
      productId: this.selectedProductId,
      ...this.feedbackForm.value
    };

    this.feedbackService.submitFeedback(feedback).subscribe(() => {
       this.alertService.show('Feedback submitted successfully!','success');
      this.feedbackForm.reset();
      this.showForm = false;
    });
  }
}
