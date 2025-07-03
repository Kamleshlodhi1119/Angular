import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { OrderItemComponent } from '../order-item/order-item.component';

@Component({
  selector: 'app-feedback-item',

  templateUrl: './feedback-item.component.html',
  styleUrls: ['./feedback-item.component.css']
})
export class FeedbackItemComponent {
  @Input() feedback!: {
    product: { name: string },
    customer: { name: string },
    rating: number,
    comment: string
  };
}
