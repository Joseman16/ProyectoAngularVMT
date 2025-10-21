import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environments} from '../../../environments/environments';
import {IApiResponse} from '../../shared/interfaces/IApiResponse.interface';
import {ISupplier} from '../interfaces/ISupplier.interface';

@Injectable({
    providedIn: 'root'
})
export class SupplierService {
     
    private readonly _baseUrl: string = environments.baseUrl;
    private readonly _http = inject(HttpClient);

    constructor() {}
    getListSuppliers(): Observable<IApiResponse<ISupplier[]>> {
        // Datos predeterminados para proveedores
        const defaultSuppliers: ISupplier[] = [
            {
                provId: 1,
                provRuc: '1234567890001',
                provNomComercial: 'Distribuidora TechPro',
                provRazon: 'TechPro Distribuciones S.A.',
                provDireccion: 'Av. Industrial 123',
                provTelefono: 5550100,
                ciudadId: 1,
                estado: 'ACTIVO',
                fechaHoraReg: new Date(),
                fechaHoraAct: new Date(),
                usuIdReg: 1,
                usuIAct: 1,
                moviminetoCabs: []
            },
            {
                provId: 2,
                provRuc: '1234567890002',
                provNomComercial: 'ElectroSuministros',
                provRazon: 'ElectroSuministros del Norte Ltda.',
                provDireccion: 'Calle Electrónica 456',
                provTelefono: 5550200,
                ciudadId: 1,
                estado: 'ACTIVO',
                fechaHoraReg: new Date(),
                fechaHoraAct: new Date(),
                usuIdReg: 1,
                usuIAct: 1,
                moviminetoCabs: []
            },
            {
                provId: 3,
                provRuc: '1234567890003',
                provNomComercial: 'Global Suppliers',
                provRazon: 'Global Suppliers International Inc.',
                provDireccion: 'Plaza Global 789',
                provTelefono: 5550300,
                ciudadId: 1,
                estado: 'ACTIVO',
                fechaHoraReg: new Date(),
                fechaHoraAct: new Date(),
                usuIdReg: 1,
                usuIAct: 1,
                moviminetoCabs: []
            },
            {
                provId: 4,
                provRuc: '1234567890004',
                provNomComercial: 'FastDeliver',
                provRazon: 'FastDeliver Express S.A.',
                provDireccion: 'Terminal Logístico 321',
                provTelefono: 5550400,
                ciudadId: 1,
                estado: 'ACTIVO',
                fechaHoraReg: new Date(),
                fechaHoraAct: new Date(),
                usuIdReg: 1,
                usuIAct: 1,
                moviminetoCabs: []
            }
        ];

        return of({
            code: 200,
            message: 'Proveedores obtenidos exitosamente',
            data: defaultSuppliers
        } as IApiResponse<ISupplier[]>);

        // Descomenta la línea siguiente para usar la API real
        // const url = `${this._baseUrl}/supplier/Listar-proveedor`;
        // return this._http.get<IApiResponse<ISupplier[]>>(url);
    }
}