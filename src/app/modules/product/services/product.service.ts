import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { IApiResponse } from '../../shared/interfaces/IApiResponse.interface';
import { IProduct } from '../interfaces/IProduct.interface';
import { Observable, of } from 'rxjs';
import { IUpdateProduct } from '../interfaces/IUpdateProduct.interface';
import { ICreateProduct } from '../interfaces/ICreateProduct.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly _http = inject(HttpClient)
  private readonly _baseUrl: string = environments.baseUrl;

  constructor() { }

  // ? Productos con localStorage
  getListProducts(): Observable<IApiResponse<IProduct[]>>{
    try {
      const products = this.getProductsFromStorage();
      return of({
        code: 200,
        message: 'Productos obtenidos exitosamente',
        messageDev: 'Products retrieved successfully',
        data: products
      } as IApiResponse<IProduct[]>);
    } catch (error) {
      return of({
        code: 500,
        message: 'Error al obtener productos',
        messageDev: 'Error retrieving products',
        data: []
      } as IApiResponse<IProduct[]>);
    }

    // Descomenta para usar la API real
    // const url: string = `${this._baseUrl}/Product/Listar-Productos`;
    // return this._http.get<IApiResponse<IProduct[]>>(url)
  }

  putUpdateProduct(id: string, payload: IUpdateProduct): Observable<IApiResponse<boolean>>{
    try {
      const products = this.getProductsFromStorage();
      const index = products.findIndex(p => p.prodId.toString() === id);
      
      if (index === -1) {
        return of({
          code: 404,
          message: 'Producto no encontrado',
          messageDev: 'Product not found',
          data: false
        } as IApiResponse<boolean>);
      }

      // Actualizar el producto
      products[index] = {
        ...products[index],
        ...payload,
        fechaHoraAct: new Date(),
        usuIdAct: 1
      };

      this.saveProductsToStorage(products);

        return of({
          code: 200,
          message: 'Producto actualizado exitosamente',
          messageDev: 'Product updated successfully',
          data: true
        } as IApiResponse<boolean>);
    } catch (error) {
        return of({
          code: 500,
          message: 'Error al actualizar producto',
          messageDev: 'Error updating product',
          data: false
        } as IApiResponse<boolean>);
    }

    // Descomenta para usar la API real
    // const url: string = `${this._baseUrl}/Product/Actualizar-Productos`
    // const body = { ...payload }
    // return this._http.put(url, body, { params: { id } })
  }

  postCreateProduct(payload: ICreateProduct): Observable<IApiResponse<IProduct>>{
    try {
      const products = this.getProductsFromStorage();
      
      // Generar nuevo ID
      const newId = products.length > 0 ? Math.max(...products.map(p => p.prodId)) + 1 : 1;
      
      const newProduct: IProduct = {
        prodId: newId,
        prodDescripcion: payload.prodDescripcion,
        prodUltPrecio: payload.prodUltPrecio,
        fechaHoraReg: new Date(),
        fechaHoraAct: new Date(),
        usuIdReg: 1,
        usuIdAct: 1,
        estado: 1,
        categoriaId: payload.categoriaId,
        empresaId: payload.empresaId,
        proveedorId: payload.proveedorId,
        marcaId: payload.marcaId,
        categoria: {
          categoriaId: payload.categoriaId,
          categoriaDescrip: null
        },
        marca: {
          marcaId: payload.marcaId,
          marcaDescrip: 'Marca'
        },
        movimientoDetProductos: []
      };

      products.push(newProduct);
      this.saveProductsToStorage(products);

      return of({
        code: 201,
        message: 'Producto creado exitosamente',
        messageDev: 'Product created successfully',
        data: newProduct
      } as IApiResponse<IProduct>);
    } catch (error) {
      return of({
        code: 500,
        message: 'Error al crear producto',
        messageDev: 'Error creating product',
        data: {} as IProduct
      } as IApiResponse<IProduct>);
    }

    // Descomenta para usar la API real
    // const url: string = `${this._baseUrl}/Product/Crear-Productos`
    // const body = { ...payload }
    // return this._http.post(url, body)
  }

  deleteProduct(id: string): Observable<IApiResponse<boolean>>{
    try {
      const products = this.getProductsFromStorage();
      const index = products.findIndex(p => p.prodId.toString() === id);
      
      if (index === -1) {
        return of({
          code: 404,
          message: 'Producto no encontrado',
          messageDev: 'Product not found',
          data: false
        } as IApiResponse<boolean>);
      }

      products.splice(index, 1);
      this.saveProductsToStorage(products);

        return of({
          code: 200,
          message: 'Producto eliminado exitosamente',
          messageDev: 'Product deleted successfully',
          data: true
        } as IApiResponse<boolean>);
    } catch (error) {
        return of({
          code: 500,
          message: 'Error al eliminar producto',
          messageDev: 'Error deleting product',
          data: false
        } as IApiResponse<boolean>);
    }

    // Descomenta para usar la API real
    // const url: string = `${this._baseUrl}/Product/Eliminar-Productos/${id}`
    // return this._http.delete<IApiResponse<boolean>>(url)
  }

  // Métodos auxiliares para localStorage
  private getProductsFromStorage(): IProduct[] {
    const stored = localStorage.getItem('products');
    if (!stored) {
      // Inicializar con datos de ejemplo si no hay nada guardado
      this.initializeSampleData();
      return this.getProductsFromStorage();
    }
    return JSON.parse(stored);
  }

  private saveProductsToStorage(products: IProduct[]): void {
    localStorage.setItem('products', JSON.stringify(products));
  }

  private initializeSampleData(): void {
    const sampleProducts: IProduct[] = [
      {
        prodId: 1,
        prodDescripcion: 'iPhone 15 Pro',
        prodUltPrecio: 999.99,
        fechaHoraReg: new Date(),
        fechaHoraAct: new Date(),
        usuIdReg: 1,
        usuIdAct: 1,
        estado: 1,
        categoriaId: 1,
        empresaId: 1,
        proveedorId: 1,
        marcaId: 2,
        categoria: {
          categoriaId: 1,
          categoriaDescrip: null
        },
        marca: {
          marcaId: 2,
          marcaDescrip: 'Apple'
        },
        movimientoDetProductos: []
      },
      {
        prodId: 2,
        prodDescripcion: 'Samsung Galaxy S24',
        prodUltPrecio: 899.99,
        fechaHoraReg: new Date(),
        fechaHoraAct: new Date(),
        usuIdReg: 1,
        usuIdAct: 1,
        estado: 1,
        categoriaId: 1,
        empresaId: 1,
        proveedorId: 2,
        marcaId: 1,
        categoria: {
          categoriaId: 1,
          categoriaDescrip: null
        },
        marca: {
          marcaId: 1,
          marcaDescrip: 'Samsung'
        },
        movimientoDetProductos: []
      },
      {
        prodId: 3,
        prodDescripcion: 'Nike Air Max 270',
        prodUltPrecio: 150.00,
        fechaHoraReg: new Date(),
        fechaHoraAct: new Date(),
        usuIdReg: 1,
        usuIdAct: 1,
        estado: 1,
        categoriaId: 4,
        empresaId: 2,
        proveedorId: 3,
        marcaId: 3,
        categoria: {
          categoriaId: 4,
          categoriaDescrip: null
        },
        marca: {
          marcaId: 3,
          marcaDescrip: 'Nike'
        },
        movimientoDetProductos: []
      }
    ];

    this.saveProductsToStorage(sampleProducts);
  }

}
