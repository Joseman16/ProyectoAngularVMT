import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'list',
    loadComponent: () => import('./pages/list-products/list-products').then( c => c.ListProducts)
  },
  {
    path: '**',
    redirectTo: 'list',
    pathMatch: 'full'
  }
]
