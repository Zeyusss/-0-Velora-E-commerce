import { Routes } from '@angular/router';
import { AnonLayoutComponent } from './core/layout/anon-layout/anon-layout.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { UserLayoutComponent } from './core/layout/user-layout/user-layout.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { isloggedinGuard } from './core/guard/isloggedin/isloggedin-guard';
import { authGuard } from './core/guard/auth/auth-guard';
import { ForgotpasswordComponent } from './core/auth/forgotpassword/forgotpassword.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: AnonLayoutComponent,
    canActivate: [isloggedinGuard],
    children: [
      { path: 'login', component: LoginComponent, title: 'Login ' },
      { path: 'register', component: RegisterComponent, title: 'Register' },
      { path: 'forgotpassword', component: ForgotpasswordComponent, title: 'ForgotPassword ' },
    ],
  },
  {
    path: '',
    component: UserLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./features/home/home.component').then((c) => c.HomeComponent),
        title: 'Home ',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./features/brands/brands.component').then((c) => c.BrandsComponent),
        title: 'Brands ',
      },
      {
        path: 'cart',
        loadComponent: () => import('./features/cart/cart.component').then((c) => c.CartComponent),
        title: 'Cart ',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/categories.component').then((c) => c.CategoriesComponent),
        title: 'Categories ',
      },
      {
        path: 'checkout/:cartId',
        loadComponent: () =>
          import('./features/checkout/checkout.component').then((c) => c.CheckoutComponent),
        title: 'checkout ',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products.component').then((c) => c.ProductsComponent),
        title: 'Products ',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./features/details/details.component').then((c) => c.DetailsComponent),
        title: 'Details ',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./features/allorders/allorders.component').then((c) => c.AllordersComponent),
        title: 'allorders ',
      },
      {
        path: 'newsletter',
        loadComponent: () =>
          import('./features/newsletter/newsletter.component').then((c) => c.NewsletterComponent),
        title: 'NewsLetter ',
      },
      {
        path: 'faq',
        loadComponent: () => import('./features/faq/faq.component').then((c) => c.FaqComponent),
        title: 'FAQ ',
      },
      {
        path: 'contactus',
        loadComponent: () =>
          import('./features/contactus/contactus.component').then((c) => c.ContactusComponent),
        title: 'ContactUs ',
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./features/wishlist/wishlist.component').then((c) => c.WishlistComponent),
        title: 'Wish List ',
      },
    ],
  },
  { path: '**', component: NotfoundComponent, title: 'NotFound ' },
];
