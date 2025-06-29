import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// User Components
import { LoginComponent } from './user/auth/login/login.component';
import { RegisterComponent } from './user/auth/register/register.component';
import { HomeComponent } from './user/home/home.component';
import { ProductsComponent } from './user/products/products.component';
import { CartComponent } from './user/cart/cart.component';
import { OrdersComponent } from './user/orders/orders.component';
import { ProfileComponent } from './user/profile/profile.component';
import { CheckoutComponent } from './user/checkout/checkout.component';
import { FeedbackComponent } from './user/feedback/feedback.component';
import { NavBarComponent } from './user/nav-bar/nav-bar.component';

// Admin Components
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ViewCustomersComponent } from './admin/view-customers/view-customers.component';
import { ViewOrdersComponent } from './admin/view-orders/view-orders.component';
import { ViewFeedbacksComponent } from './admin/view-feedbacks/view-feedbacks.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { UpdateProductComponent } from './admin/update-product/update-product.component';
import { ViewProductsComponent } from './admin/view-products/view-products.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';

// Guards
import { AdminGuard } from './shared/guards/admin.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { ShopComponent } from './user/shop/shop.component';

const routes: Routes = [

   // Publicly accessible
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:productId', component: SingleProductComponent },
  { path: 'user/auth/login', component: LoginComponent },
  { path: 'user/auth/register', component: RegisterComponent },

  
  // User-protected routes
  // { path: 'cart', component: CartComponent},
  // { path: 'orders', component: OrdersComponent},
  // { path: 'profile', component: ProfileComponent },
  // { path: 'checkout', component: CheckoutComponent },
  // { path: 'feedback', component: FeedbackComponent},
  // { path: 'customer/profile', component: ProfileComponent },
  // { path: 'user/nav-bar', component: NavBarComponent },
 // User Auth
  { path: 'admin/admin-login', component: AdminLoginComponent },

  // User Protected Routes
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'cart', component: CartComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'orders', component: ViewOrdersComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'feedback', component: FeedbackComponent },
      {path: 'customer/profile', component: ProfileComponent},
      {path: 'user/nav-bar', component: NavBarComponent }
    ]
  },
  { path: 'shop', component: ShopComponent },
  // Admin Auth
  { path: 'admin/admin-login', component: AdminLoginComponent },

  // Admin Protected Routes
  {
    path: 'admin',
    canActivate: [AdminGuard],
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'admin-header', component: AdminHeaderComponent },
      { path: 'customers', component: ViewCustomersComponent },
      { path: 'orders', component: ViewOrdersComponent },
      { path: 'feedbacks', component: ViewFeedbacksComponent },
      { path: 'products', component: ViewProductsComponent },
      { path: 'products/add', component: AddProductComponent },
      // { path: 'products/update/:id', component: UpdateProductComponent }
      
      
    ]
  },{ path: 'admin/products/update/:id', component: UpdateProductComponent },

  // Default Redirect
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
