import { Routes } from '@angular/router';
import { adminGuard, authGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    title: 'Atelier Vanguard — Made to Measure',
  },
  {
    path: 'shop',
    loadComponent: () => import('./features/shop/shop').then((m) => m.Shop),
    title: 'Shop | Atelier Vanguard',
  },
  {
    path: 'product/:slug',
    loadComponent: () => import('./features/product/product').then((m) => m.ProductPage),
  },
  {
    path: 'configure/:slug',
    loadComponent: () => import('./features/configurator/configurator').then((m) => m.Configurator),
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart').then((m) => m.Cart),
    title: 'Shopping bag',
  },
  {
    path: 'checkout',
    canActivate: [authGuard],
    loadComponent: () => import('./features/checkout/checkout').then((m) => m.Checkout),
    title: 'Checkout',
  },
  {
    path: 'order-confirmation',
    loadComponent: () => import('./features/confirmation/confirmation').then((m) => m.Confirmation),
  },
  {
    path: 'measurements',
    canActivate: [authGuard],
    loadComponent: () => import('./features/measurements/measurements').then((m) => m.Measurements),
    title: 'Measurements',
  },
  {
    path: 'booking',
    loadComponent: () => import('./features/booking/booking').then((m) => m.Booking),
    title: 'Book a fitting',
  },
  {
    path: 'alterations',
    loadComponent: () => import('./features/alterations/alterations').then((m) => m.Alterations),
    title: 'Alteration support',
  },
  {
    path: 'account',
    canActivate: [authGuard],
    loadComponent: () => import('./features/account/account').then((m) => m.Account),
    title: 'Your account',
  },
  {
    path: 'order/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./features/account/order-detail').then((m) => m.OrderDetail),
    title: 'Order tracking',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login').then((m) => m.Login),
    title: 'Sign in',
  },
  { path: 'register', redirectTo: 'login' },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./features/admin/admin').then((m) => m.Admin),
    title: 'Operations dashboard',
  },
  { path: '**', redirectTo: '' },
];
