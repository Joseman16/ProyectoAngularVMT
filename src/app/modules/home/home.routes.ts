import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: 'dasboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then( c => c.Dashboard)
  },
  {
    path: '**',
    redirectTo: 'dasboard',
    pathMatch: 'full'
  }
]
