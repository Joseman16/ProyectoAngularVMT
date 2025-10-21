export interface IProduct {
    prodId:                 number;
    prodDescripcion:        string;
    prodUltPrecio:          number;
    fechaHoraReg:           Date | null;
    fechaHoraAct:           Date;
    usuIdReg:               number | null;
    usuIdAct:               number;
    estado:                 number;
    categoriaId:            number;
    empresaId:              number;
    proveedorId:            number;
    marcaId:                number;
    categoria:              Categoria;
    marca:                  Marca;
    movimientoDetProductos: MovimientoDetProducto[];
}

export interface Categoria {
    categoriaId:      number;
    categoriaDescrip: null;
}

export interface Marca {
    marcaId:      number;
    marcaDescrip: string;
}

export interface MovimientoDetProducto {
    movidetProdId: number;
    cantidad:      number;
    precio:        number;
    movimientoCab: MovimientoCab;
}

export interface MovimientoCab {
    movicabId:        number;
    secuenciaFactura: string;
}
