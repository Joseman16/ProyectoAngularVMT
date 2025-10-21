import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environments} from '../../../environments/environments';
import {IApiResponse} from '../../shared/interfaces/IApiResponse.interface';
import {ICategory} from '../interfaces/ICategory.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly _http = inject(HttpClient);
  private readonly _baseUrl: string  = environments.baseUrl;

  constructor(){}

  getListCategory(): Observable<IApiResponse<ICategory[]>> {
    // Datos predeterminados para categorías
    const defaultCategories: ICategory[] = [
      {
        categoriaId: 1,
        categoriaDescrip: 'Electrónicos',
        productos: [],
        estado: 1,
        fechaHoraReg: null,
        fechaHoraAct: new Date(),
        useIdReg: null,
        userIdAct: 1
      },
      {
        categoriaId: 2,
        categoriaDescrip: 'Ropa y Accesorios',
        productos: [],
        estado: 1,
        fechaHoraReg: null,
        fechaHoraAct: new Date(),
        useIdReg: null,
        userIdAct: 1
      },
      {
        categoriaId: 3,
        categoriaDescrip: 'Hogar y Jardín',
        productos: [],
        estado: 1,
        fechaHoraReg: null,
        fechaHoraAct: new Date(),
        useIdReg: null,
        userIdAct: 1
      },
      {
        categoriaId: 4,
        categoriaDescrip: 'Deportes',
        productos: [],
        estado: 1,
        fechaHoraReg: null,
        fechaHoraAct: new Date(),
        useIdReg: null,
        userIdAct: 1
      },
      {
        categoriaId: 5,
        categoriaDescrip: 'Libros y Papelería',
        productos: [],
        estado: 1,
        fechaHoraReg: null,
        fechaHoraAct: new Date(),
        useIdReg: null,
        userIdAct: 1
      }
    ];

    return of({
      code: 200,
      message: 'Categorías obtenidas exitosamente',
      data: defaultCategories
    } as IApiResponse<ICategory[]>);

    // Descomenta la línea siguiente para usar la API real
    // const url = `${this._baseUrl}/category/Listar-categoria`;
    // return this._http.get<IApiResponse<ICategory[]>>(url);
  }


}