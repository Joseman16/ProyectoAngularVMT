import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IApiResponse } from '../../shared/interfaces/IApiResponse.interface';
import { ICompany } from '../interfaces/ICompany.interface';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private readonly _http = inject(HttpClient);
  private readonly _baseUrl: string = environments.baseUrl;

  getListCompany(): Observable<IApiResponse<ICompany[]>> {
    // Datos predeterminados para empresas
    const defaultCompanies: ICompany[] = [
      {
        companyId: 1,
        companyName: 'Viamatica S.A.',
        companyDescription: 'Empresa líder en tecnología e innovación',
        companyAddress: 'Av. Principal 123, Ciudad',
        companyPhone: '+1-555-0123',
        companyEmail: 'info@viamatica.com',
        companyWebsite: 'www.viamatica.com',
        companyLogo: '',
        companyStatus: 1,
        fechaHoraReg: new Date(),
        fechaHoraAct: new Date(),
        userIdReg: 1,
        userIdAct: 1
      },
      {
        companyId: 2,
        companyName: 'TechCorp Solutions',
        companyDescription: 'Soluciones tecnológicas avanzadas',
        companyAddress: 'Calle Tecnológica 456',
        companyPhone: '+1-555-0456',
        companyEmail: 'contact@techcorp.com',
        companyWebsite: 'www.techcorp.com',
        companyLogo: '',
        companyStatus: 1,
        fechaHoraReg: new Date(),
        fechaHoraAct: new Date(),
        userIdReg: 1,
        userIdAct: 1
      },
      {
        companyId: 3,
        companyName: 'InnovateHub',
        companyDescription: 'Centro de innovación y desarrollo',
        companyAddress: 'Plaza Innovación 789',
        companyPhone: '+1-555-0789',
        companyEmail: 'hello@innovatehub.com',
        companyWebsite: 'www.innovatehub.com',
        companyLogo: '',
        companyStatus: 1,
        fechaHoraReg: new Date(),
        fechaHoraAct: new Date(),
        userIdReg: 1,
        userIdAct: 1
      }
    ];

    return of({
      code: 200,
      message: 'Empresas obtenidas exitosamente',
      data: defaultCompanies
    } as IApiResponse<ICompany[]>);

    // Descomenta la línea siguiente para usar la API real
    // const url: string = `${this._baseUrl}/Company/GetListCompany`;
    // return this._http.get<IApiResponse<ICompany[]>>(url);
  }

  getCompanyById(id: number): Observable<IApiResponse<ICompany>> {
    const url: string = `${this._baseUrl}/Company/GetCompanyById/${id}`;
    return this._http.get<IApiResponse<ICompany>>(url);
  }

  createCompany(company: ICompany): Observable<IApiResponse<boolean>> {
    const url: string = `${this._baseUrl}/Company/CreateCompany`;
    return this._http.post<IApiResponse<boolean>>(url, company);
  }

  updateCompany(company: ICompany): Observable<IApiResponse<boolean>> {
    const url: string = `${this._baseUrl}/Company/UpdateCompany`;
    return this._http.put<IApiResponse<boolean>>(url, company);
  }

  deleteCompany(id: number): Observable<IApiResponse<boolean>> {
    const url: string = `${this._baseUrl}/Company/DeleteCompany/${id}`;
    return this._http.delete<IApiResponse<boolean>>(url);
  }
}
