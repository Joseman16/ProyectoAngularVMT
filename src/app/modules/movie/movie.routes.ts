import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'now-playing',
    loadComponent: () => import('./pages/now-playing/now-playing').then( c => c.NowPlaying)
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./pages/movie-detail/movie-detail').then( c => c.MovieDetail)
  },
  {
    path: 'error',
    loadComponent: () => import('../shared/components/error/error').then( c => c.Error)
  },
  {
    path: '**',
    redirectTo: 'now-playing',
    pathMatch: 'full'
  }
]
