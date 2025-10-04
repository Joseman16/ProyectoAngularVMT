import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../../../../environments/environments'; // <-- corregido

// Interfaces
export interface IRegister {
  companyId: number;
  email: string;
  name: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  code: number;
  message: string;
  data?: {
    jwt: string;
    user?: any;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environments.apiUrl; // <-- corregido

  /**
   * Registra un nuevo usuario
   */
  register(data: IRegister): Observable<any> {
    console.log('🌐 Register URL:', `${this.apiUrl}/Security/Authentication/Register`);
    console.log('📦 Register Data:', data);
    
    return this.http.post<any>(
      `${this.apiUrl}/Security/Authentication/Register`,
      data
    );
  }

  /**
   * Inicia sesión de un usuario
   */
  login(credentials: ILogin): Observable<ILoginResponse> {
    console.log('🌐 Login URL:', `${this.apiUrl}/Security/Authentication/Login`);
    console.log('📦 Login Credentials:', credentials);
    
    return this.http.post<ILoginResponse>(
      `${this.apiUrl}/Security/Authentication/Login`,
      credentials
    );
  }

  /**
   * Cierra sesión (opcional)
   */
  logout(): void {
    localStorage.removeItem('token'); // <-- opcional
    localStorage.removeItem('user');  // <-- opcional
  }
}
