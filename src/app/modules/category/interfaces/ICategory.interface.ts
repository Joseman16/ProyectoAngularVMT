export interface ICategory {
    categoriaId: number;
    categoriaDescrip: string;
    productos: Producto[];
    estado: number;
    fechaHoraReg: null;
    fechaHoraAct: Date;
    useIdReg: null;
    userIdAct: number;
}

export interface Producto{
    productoId: number;
    prodDescripcion: string;
}