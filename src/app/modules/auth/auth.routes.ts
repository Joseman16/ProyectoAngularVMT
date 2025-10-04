import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then( c => c.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then( c => c.Register)
  },
  {
    path: 'change-password',
    loadComponent: () => import('./pages/change-password/change-password').then( c => c.ChangePassword)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
]
