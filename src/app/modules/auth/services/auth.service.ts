import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ILogin } from '../interfaces/ILogin.interface';
import { Observable, of } from 'rxjs';
import { IApiResponse } from '../../shared/interfaces/IApiResponse.interface';
import { ILoginResponse } from '../interfaces/ILoginResponse';
import { environments } from '../../../environments/environments';
import { IRegister } from '../interfaces/IRegister.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _baseUrl: string = environments.baseUrl;
  private readonly _http = inject(HttpClient)

  login(payload: ILogin): Observable<IApiResponse<ILoginResponse>> {
    /*const url: string = `${this._baseUrl}/Security/Authentication/Login`
    const body = { ...payload }
    return this._http.post<IApiResponse<ILoginResponse>>(url, body)
    */
   return of({
      code:200,
      message: 'Tranasacción exitosa, OK!',
      data: {
        id:1,
        companyName: 'Viamatica',
        jwt: '0942677998',
        name: 'Jose Leon'
      }
    } as IApiResponse<ILoginResponse>); 
  }

  register(payload: IRegister): Observable<IApiResponse<boolean>> {
    const url: string = `${this._baseUrl}/Security/Authentication/Register`
    const body = { ...payload }
    return this._http.post<IApiResponse<boolean>>(url, body)
  }

}
