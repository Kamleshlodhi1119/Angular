import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../shared/services/feedback.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { OrderItemComponent } from '../../components/order-item/order-item.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-feedbacks',
  templateUrl: './view-feedbacks.component.html',
  styleUrls: ['./view-feedbacks.component.css']
})
export class ViewFeedbacksComponent implements OnInit {
  feedbacks: any[] = [];
  error = '';

  constructor(private http: HttpClient,private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.feedbackService.getAllFeedbacks().subscribe({
      next: data => this.feedbacks = data,
      error: () => this.error = 'Failed to load feedbacks.'
    });
  }

  deleteFeedback(customerId: number, productId: number): void {
    const url = `http://localhost:8080/api/feedback/delete?customerId=${customerId}&productId=${productId}`;

    this.http.delete(url).subscribe({
      next: () => {
        // Remove the feedback from list after deletion
        this.feedbacks = this.feedbacks.filter(
          fb => !(fb.customer.id === customerId && fb.product.id === productId)
        );
      },
      error: (err) => {
        console.error('Error deleting feedback:', err);
        this.error = 'Failed to delete feedback.';
      }
    });
  }
}
