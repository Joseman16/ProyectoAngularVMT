import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { jwtDecode } from 'jwt-decode'
import { LocalStorageService } from '../services/localStorage.service';
import { EnumKeys } from '../enums/keys';
import { URL_ROUTES } from '../const/url-routes';
import { IToken } from '../interfaces/IToken.interface';

export const authGuard: CanActivateFn = (route, state) => {
  const localStorage = inject(LocalStorageService);
  const router = inject(Router)

  const jwt = localStorage.getItem<string>(EnumKeys.JWT)
  if(jwt){
    const decode = jwtDecode<IToken>(jwt)
    const current = Math.floor(Date.now() / 1000)
    if(decode.exp > current){
      return true
    }
    localStorage.removeItem(EnumKeys.JWT)

  }
  router.navigateByUrl(URL_ROUTES.LOGIN);
  return false;
};
