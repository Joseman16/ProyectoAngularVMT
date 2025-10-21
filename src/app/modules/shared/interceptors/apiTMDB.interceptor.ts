import type { HttpInterceptorFn } from '@angular/common/http';
import { environments } from '../../../environments/environments';

export const apiTMDBInterceptor: HttpInterceptorFn = (req, next) => {
  let cloneReq = req;
  const apiKey: string = environments.apiKeyTMDB;
  if (apiKey && req.url.includes(environments.baseUrlTMDB)) {
    cloneReq = cloneReq.clone({
      setHeaders: {
        "Authorization": `Bearer ${apiKey}`
      },
      setParams: {
        "language": "es-ES"
      }
    })
  }
  return next(cloneReq);
};
