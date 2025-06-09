import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Shared components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

// User components
import { HomeComponent } from './user/home/home.component';
import { OrdersComponent } from './user/orders/orders.component';
import { RegisterComponent } from './user/auth/register/register.component';
import { LoginComponent } from './user/auth/login/login.component';
import { CartComponent } from './user/cart/cart.component';
import { CheckoutComponent } from './user/checkout/checkout.component';
import { ProductsComponent } from './user/products/products.component';
import { FeedbackComponent } from './user/feedback/feedback.component';
import { OrderItemComponent } from './components/order-item/order-item.component';

// Admin components
import { ViewCustomersComponent } from './admin/view-customers/view-customers.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { ViewFeedbacksComponent } from './admin/view-feedbacks/view-feedbacks.component';
import { ViewOrdersComponent } from './admin/view-orders/view-orders.component';
import { ViewProductsComponent } from './admin/view-products/view-products.component';
import { UpdateProductComponent } from './admin/update-product/update-product.component';


// Shared components
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';

// Interceptors
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { NavBarComponent } from './user/nav-bar/nav-bar.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ProfileComponent } from './user/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    
    // User components
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    CheckoutComponent,
    OrdersComponent,
    ProductsComponent,
    ProfileComponent,
    FeedbackComponent,
    OrderItemComponent,
    
    // Admin components
    AdminLoginComponent,
    ViewCustomersComponent,
    ViewFeedbacksComponent,
    AddProductComponent,
    ViewOrdersComponent,
    ViewProductsComponent,
    UpdateProductComponent,
    AdminHeaderComponent,
    AdminDashboardComponent,
    
    
    // Shared components
    ProductCardComponent,
    CartItemComponent,
    AdminHeaderComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    RouterModule.forRoot([])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }