export interface ISupplier{
    provId: number;
    provRuc: string;
    provNomComercial: string;
    provRazon: string;
    provDireccion: string;
    provTelefono: number;
    ciudadId: number;
    estado: string;
    fechaHoraReg: Date | null;
    fechaHoraAct: Date | null;
    usuIdReg: number | null;
    usuIAct: number | null;
    moviminetoCabs: MovimientoCab[];

}

export interface MovimientoCab{
    moviCabId: number;
    moviCabDescripcion: string;
    fechaHoraReg: Date | null;
    clienteId: number | null;
    proveedorId: number | null;
}