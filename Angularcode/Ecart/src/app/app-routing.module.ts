import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './user/auth/login/login.component';
import { RegisterComponent } from './user/auth/register/register.component';
import { HomeComponent } from './user/home/home.component';
import { ProductsComponent } from './user/products/products.component';
import { CartComponent } from './user/cart/cart.component';
import { OrdersComponent } from './user/orders/orders.component';
import { ProfileComponent } from './user/profile/profile.component';
import { CheckoutComponent } from './user/checkout/checkout.component';
import { FeedbackComponent } from './user/feedback/feedback.component';

import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ViewCustomersComponent } from './admin/view-customers/view-customers.component';
import { ViewOrdersComponent } from './admin/view-orders/view-orders.component';
import { ViewFeedbacksComponent } from './admin/view-feedbacks/view-feedbacks.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { UpdateProductComponent } from './admin/update-product/update-product.component';
import { ViewProductsComponent } from './admin/view-products/view-products.component';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './user/nav-bar/nav-bar.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'feedback', component: FeedbackComponent },

  { path: 'user/auth/login', component: LoginComponent },
  { path: 'user/auth/register', component: RegisterComponent },
  { path: 'user/nav-bar', component: NavBarComponent },

  { path: 'admin/admin-login', component: AdminLoginComponent },
  { path: 'admin/admin-header', component: AdminHeaderComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'admin/customers', component: ViewCustomersComponent },
  { path: 'admin/orders', component: ViewOrdersComponent },
  { path: 'admin/feedbacks', component: ViewFeedbacksComponent },
  { path: 'admin/products', component: ViewProductsComponent },
  { path: 'admin/products/add', component: AddProductComponent },
  { path: 'admin/products/update/:id', component: UpdateProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
