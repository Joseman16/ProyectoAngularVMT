import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then( c => c.Dashboard)
  },
  {
    path: 'products',
    loadChildren: () => import('../product/product.routes').then( r => r.routes)
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
]
