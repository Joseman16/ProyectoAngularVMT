import type { HttpInterceptorFn } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { LocalStorageService } from '../services/localStorage.service';
import { inject } from '@angular/core';
import { EnumKeys } from '../enums/keys';

export const apiVMTDEVInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorage = inject(LocalStorageService)
  let cloneReq = req;
  const token = localStorage.getItem(EnumKeys.JWT);
  if(token && req.url.includes(environments.baseUrl)){
    cloneReq = cloneReq.clone({
      setHeaders: {
        "Token": `${token}`
      }
    })
  }
  return next(cloneReq);
};
