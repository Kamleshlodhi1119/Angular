import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../shared/services/feedback.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { OrderItemComponent } from '../../components/order-item/order-item.component';

@Component({
  selector: 'app-view-feedbacks',
  templateUrl: './view-feedbacks.component.html',
  styleUrls: ['./view-feedbacks.component.css']
})
export class ViewFeedbacksComponent implements OnInit {
  feedbacks: any[] = [];
  error = '';

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.feedbackService.getAllFeedbacks().subscribe({
      next: data => this.feedbacks = data,
      error: () => this.error = 'Failed to load feedbacks.'
    });
  }
}
