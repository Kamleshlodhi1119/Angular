declare var $: any;

import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';
import { CartService } from 'src/app/shared/services/cart.service';
import { CartItem } from 'src/app/shared/models/cart.model';
import { UserSessionService } from 'src/app/shared/services/user-session.service';
import { User } from 'src/app/shared/models/user.model';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  products: Product[] = [];
  error = '';
  currentUser: User | null = null;
  routerEventsSub: Subscription | undefined;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private userSession: UserSessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userSession.getCustomer();

    this.productService.getActiveProducts().subscribe({
      next: (res) => (this.products = res),
      error: () => (this.error = 'Failed to load products.')
    });

    // Listen to navigation events to reinit Owl Carousel on return
    this.routerEventsSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/') {
        setTimeout(() => this.initCarousels(), 100);
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initCarousels(), 100);
  }

  initCarousels(): void {
    // Destroy if already initialized
    try {
      $('.home-slides-three').trigger('destroy.owl.carousel');
      $('.home-slides-three').html($('.home-slides-three').html());

      $('.testimonial-slider').trigger('destroy.owl.carousel');
      $('.testimonial-slider').html($('.testimonial-slider').html());
    } catch (err) {}

    $('.home-slides-three').owlCarousel({
      loop: true,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 3000,
      smartSpeed: 1000,
      items: 1
    });

    $('.testimonial-slider').owlCarousel({
      loop: true,
      margin: 20,
      nav: false,
      dots: true,
      autoplay: true,
      autoplayTimeout: 4000,
      smartSpeed: 800,
      items: 1
    });
  }

  handleAddToCart(product: Product) {
    if (!this.currentUser) {
      alert('Please login to add items to cart.');
      return;
    }

    const cartItem: CartItem = {
      productId: product.id,
      customerId: this.currentUser.id,
      customerEmail: this.currentUser.email,
      quantity: 1,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category
    };

    this.cartService.addToCart(cartItem).subscribe({
      next: () => alert('Added to cart'),
      error: () => alert('Product Already In Cart')
    });
  }

  ngOnDestroy(): void {
    this.routerEventsSub?.unsubscribe();
  }
}
