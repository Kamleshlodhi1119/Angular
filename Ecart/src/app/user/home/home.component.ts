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
import { AlertService } from 'src/app/shared/services/alert.service';

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
    private router: Router,private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userSession.getCustomer();

    this.productService.getActiveProducts().subscribe({
      next: (res) => (this.products = res),
      error: () =>  this.alertService.show( 'Failed to load products.','error')
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
       this.alertService.show('Please login to add items to cart.','error');
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
      next: () =>  this.alertService.show('Added to cart','success'),
      error: () => this.alertService.show('Product Already In Cart','warning')
    });
  }

  ngOnDestroy(): void {
    this.routerEventsSub?.unsubscribe();
  }
}
