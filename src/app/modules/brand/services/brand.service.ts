import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environments} from '../../../environments/environments';
import {IApiResponse} from '../../shared/interfaces/IApiResponse.interface';
import {IBrand} from '../interfaces/IBrand.interface';

@Injectable({
    providedIn: 'root'
})
export class BrandService {
    private readonly _baseUrl: string = environments.baseUrl;
    private readonly _http = inject(HttpClient);
    constructor() {}
    getListBrands(): Observable<IApiResponse<IBrand[]>> {
        // Datos predeterminados para marcas
        const defaultBrands: IBrand[] = [
            {
                marcaId: 1,
                marcaDescrip: 'Samsung',
                productos: [],
                estado: 1,
                fechaHoraReg: null,
                fechaHoraAct: new Date(),
                useIdReg: null,
                userIdAct: 1
            },
            {
                marcaId: 2,
                marcaDescrip: 'Apple',
                productos: [],
                estado: 1,
                fechaHoraReg: null,
                fechaHoraAct: new Date(),
                useIdReg: null,
                userIdAct: 1
            },
            {
                marcaId: 3,
                marcaDescrip: 'Nike',
                productos: [],
                estado: 1,
                fechaHoraReg: null,
                fechaHoraAct: new Date(),
                useIdReg: null,
                userIdAct: 1
            },
            {
                marcaId: 4,
                marcaDescrip: 'Adidas',
                productos: [],
                estado: 1,
                fechaHoraReg: null,
                fechaHoraAct: new Date(),
                useIdReg: null,
                userIdAct: 1
            },
            {
                marcaId: 5,
                marcaDescrip: 'Sony',
                productos: [],
                estado: 1,
                fechaHoraReg: null,
                fechaHoraAct: new Date(),
                useIdReg: null,
                userIdAct: 1
            },
            {
                marcaId: 6,
                marcaDescrip: 'LG',
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
            message: 'Marcas obtenidas exitosamente',
            data: defaultBrands
        } as IApiResponse<IBrand[]>);

        // Descomenta la línea siguiente para usar la API real
        // const url = `${this._baseUrl}/brand/Listar-marca`;
        // return this._http.get<IApiResponse<IBrand[]>>(url);
    }
}