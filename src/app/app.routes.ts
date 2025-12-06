import { Routes } from '@angular/router';
import { AnonLayoutComponent } from './core/layout/anon-layout/anon-layout.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { UserLayoutComponent } from './core/layout/user-layout/user-layout.component';
import { HomeComponent } from './features/home/home.component';
import { BrandsComponent } from './features/brands/brands.component';
import { CartComponent } from './features/cart/cart.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { ProductsComponent } from './features/products/products.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { DetailsComponent } from './features/details/details.component';
import { isloggedinGuard } from './core/guard/isloggedin/isloggedin-guard';
import { authGuard } from './core/guard/auth/auth-guard';
import { AllordersComponent } from './features/allorders/allorders.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: AnonLayoutComponent,
    canActivate: [isloggedinGuard],
    children: [
      { path: 'login', component: LoginComponent, title: 'Login Page' },
      { path: 'register', component: RegisterComponent, title: 'RegisterPage' },
    ],
  },
  {
    path: '',
    component: UserLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: HomeComponent, title: 'Home Page' },
      { path: 'brands', component: BrandsComponent, title: 'Brands Page' },
      { path: 'cart', component: CartComponent, title: 'Cart Page' },
      { path: 'categories', component: CategoriesComponent, title: 'Categories Page' },
      { path: 'checkout/:cartId', component: CheckoutComponent, title: 'checkout Page' },
      { path: 'products', component: ProductsComponent, title: 'Products Page' },
      { path: 'details/:id', component: DetailsComponent, title: 'Details Page' },
      { path: 'allorders', component: AllordersComponent, title: 'allorders Page' },
    ],
  },
  { path: '**', component: NotfoundComponent, title: 'NotFound Page' },
];
