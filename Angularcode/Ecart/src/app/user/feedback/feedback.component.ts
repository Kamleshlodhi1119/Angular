import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeedbackService } from '../../shared/services/feedback.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { OrderItemComponent } from '../../components/order-item/order-item.component';
import { FormBuilder, FormGroup } from '@angular/forms';

// @Component({
//   selector: 'app-feedback',
//   imports: [],
//   templateUrl: './feedback.component.html',
//   styleUrl: './feedback.component.css'
// })
// export class FeedbackComponent {

// }

@Component({ 
   selector: 'app-feedback',
   templateUrl: './feedback.component.html', 
   styleUrls: ['./feedback.component.css'] })
// export class FeedbackComponent {
//   form = this.fb.group({ productId: '', rating: 5, comment: '' });
//   constructor(private fb: FormBuilder, private feedback: FeedbackService) {}
//   submit() { this.feedback.submitFeedback(this.form.value).subscribe(); }
// }

export class FeedbackComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private feedback: FeedbackService) {
    this.form = this.fb.group({
      productId: '',
      rating: 5,
      comment: ''
    });
  }

  submit() {
    this.feedback.submitFeedback(this.form.value).subscribe();
  }
}
