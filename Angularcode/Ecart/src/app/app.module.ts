// // File: src/app/app.module.ts
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';

// // Shared components
// import { HeaderComponent } from './components/header/header.component';
// import { FooterComponent } from './components/footer/footer.component';
// import { ProductCardComponent } from './components/product-card/product-card.component';
// import { CartItemComponent } from './components/cart-item/cart-item.component';
// import { OrderItemComponent } from './components/order-item/order-item.component';

// // User components
// import { HomeComponent } from './user/home/home.component';
// import { OrdersComponent } from './user/orders/orders.component';
// import { RegisterComponent } from './user/auth/register/register.component';
// import { LoginComponent } from './user/auth/login/login.component';
// import { CartComponent } from './user/cart/cart.component';
// import { CheckoutComponent } from './user/checkout/checkout.component';
// import { ProductsComponent } from './user/products/products.component';
// import { FeedbackComponent } from './user/feedback/feedback.component';
// import { ProfileComponent } from './user/profile/profile.component';
// import { NavBarComponent } from './user/nav-bar/nav-bar.component';

// // Admin components
// import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
// import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
// import { ViewCustomersComponent } from './admin/view-customers/view-customers.component';
// import { ViewFeedbacksComponent } from './admin/view-feedbacks/view-feedbacks.component';
// import { AddProductComponent } from './admin/add-product/add-product.component';
// import { ViewOrdersComponent } from './admin/view-orders/view-orders.component';
// import { ViewProductsComponent } from './admin/view-products/view-products.component';
// import { UpdateProductComponent } from './admin/update-product/update-product.component';
// import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';

// // Interceptors
// import { AuthInterceptor } from './shared/interceptors/auth.interceptor';

// @NgModule({
//   declarations: [
//     AppComponent,
//     HeaderComponent,
//     FooterComponent,
//     ProductCardComponent,
//     CartItemComponent,
//     OrderItemComponent,
//     HomeComponent,
//     OrdersComponent,
//     RegisterComponent,
//     LoginComponent,
//     CartComponent,
//     CheckoutComponent,
//     ProductsComponent,
//     FeedbackComponent,
//     ProfileComponent,
//     NavBarComponent,
//     AdminLoginComponent,
//     AdminDashboardComponent,
//     ViewCustomersComponent,
//     ViewFeedbacksComponent,
//     AddProductComponent,
//     ViewOrdersComponent,
//     ViewProductsComponent,
//     UpdateProductComponent,
//     AdminHeaderComponent
//   ],
//   imports: [
//     BrowserModule,
//     HttpClientModule,
//     FormsModule,
//     ReactiveFormsModule,
//     CommonModule,
//     AppRoutingModule
//   ],
//   providers: [
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: AuthInterceptor,
//       multi: true
//     }
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule {}
// File: src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Shared components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { OrderItemComponent } from './components/order-item/order-item.component';

// User components
import { HomeComponent } from './user/home/home.component';
import { OrdersComponent } from './user/orders/orders.component';
import { RegisterComponent } from './user/auth/register/register.component';
import { LoginComponent } from './user/auth/login/login.component';
import { CartComponent } from './user/cart/cart.component';
import { CheckoutComponent } from './user/checkout/checkout.component';
import { ProductsComponent } from './user/products/products.component';
import { FeedbackComponent } from './user/feedback/feedback.component';
import { ProfileComponent } from './user/profile/profile.component';
import { NavBarComponent } from './user/nav-bar/nav-bar.component';

// Admin components
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ViewCustomersComponent } from './admin/view-customers/view-customers.component';
import { ViewFeedbacksComponent } from './admin/view-feedbacks/view-feedbacks.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { ViewOrdersComponent } from './admin/view-orders/view-orders.component';
import { ViewProductsComponent } from './admin/view-products/view-products.component';
import { UpdateProductComponent } from './admin/update-product/update-product.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';

// Interceptors
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
    CartItemComponent,
    OrderItemComponent,
    HomeComponent,
    OrdersComponent,
    RegisterComponent,
    LoginComponent,
    CartComponent,
    CheckoutComponent,
    ProductsComponent,
    FeedbackComponent,
    ProfileComponent,
    NavBarComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    ViewCustomersComponent,
    ViewFeedbacksComponent,
    AddProductComponent,
    ViewOrdersComponent,
    ViewProductsComponent,
    UpdateProductComponent,
    AdminHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule
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
export class AppModule {}
