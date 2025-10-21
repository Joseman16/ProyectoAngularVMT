import { inject, Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { of } from 'rxjs';
import { URL_ROUTES } from '../../shared/const/url-routes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {

  private readonly _router = inject(Router)

  getRoutes() {
    return of<MenuItem[]>([
      {
        label: 'Home',
        icon: 'pi pi-home',
        badge: '2',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-chart-line',
            command: () => this._router.navigateByUrl(URL_ROUTES.DASHBOARD)
          },
          {
            label: 'Productos',
            icon: 'pi pi-box',
            items: [
              {
                label: 'Lista de Productos',
                icon: 'pi pi-list',
                command: () => this._router.navigateByUrl(URL_ROUTES.PRODUCT_LIST)
              }
            ]
          }
        ]
      },
      {
        label: 'Peliculas',
        icon: 'pi pi-video',
        badge: '4',
        items: [
          {
            label: 'En cartelera',
            icon: 'pi pi-play-circle',
            command: () => this._router.navigateByUrl(URL_ROUTES.NOW_PLAYING)
          },
          {
            label: 'Populares',
            icon: 'pi pi-star-fill',
            command: () => this._router.navigateByUrl(URL_ROUTES.POPULARES)
          },
          {
            label: 'Top Rated',
            icon: 'pi pi-star',
            command: () => this._router.navigateByUrl(URL_ROUTES.TOP_RATED)
          },
          {
            label: 'Upcoming',
            icon: 'pi pi-calendar-plus',
            command: () => this._router.navigateByUrl(URL_ROUTES.UPCOMING)
          },

          // {
          //   label: 'ERP',
          //   icon: 'pi pi-server',
          // },
          // {
          //   separator: true,
          // },
          // {
          //   label: 'CMS',
          //   icon: 'pi pi-pencil',
          // },
        ],
      },
    ]);
  }
}
