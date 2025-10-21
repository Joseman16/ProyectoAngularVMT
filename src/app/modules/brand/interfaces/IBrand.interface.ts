export interface IBrand{
    marcaId: number;
    marcaDescrip: string;
    productos: Producto[];
    estado: number;
    fechaHoraReg: null;
    fechaHoraAct: Date;
    useIdReg: null;
    userIdAct: number;
}

export interface Producto{
    prodId: number;
    prodDescripcion: string;
    prodUltPrecio: number;
    fechaHoraReg: Date | null;
    fechaHoraAct: Date;
    usuIdReg: number | null;
    usuIdAct: number;
    estado: number;
    categoriaId: number;
    empresaId: number;
    proveedorId: number;
    marcaId: number;

}
