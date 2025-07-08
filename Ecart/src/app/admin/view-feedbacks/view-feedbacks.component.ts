import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../shared/services/feedback.service';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-view-feedbacks',
  templateUrl: './view-feedbacks.component.html',
  styleUrls: ['./view-feedbacks.component.css']
})
export class ViewFeedbacksComponent implements OnInit {
  feedbacks: any[] = [];
  error = '';

  constructor(private http: HttpClient,private feedbackService: FeedbackService,private alertService: AlertService) {}

  ngOnInit(): void {
    this.feedbackService.getAllFeedbacks().subscribe({
      next: data => this.feedbacks = data,
      error: () =>this.alertService.show('Failed to load feedbacks.','error')
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
        this.alertService.show('Failed to delete feedback.','error');
      }
    });
  }
}
