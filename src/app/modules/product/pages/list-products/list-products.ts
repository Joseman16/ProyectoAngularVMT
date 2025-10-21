import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/IProduct.interface';
import { CustomTable } from '../../../shared/components/custom-table/custom-table';
import { IAccionOutput, IColumn } from '../../../shared/interfaces/ICustomTable.interface';
import { ModalProduct } from '../../components/modal-product/modal-product';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-list-products',
  imports: [CustomTable, ButtonModule],
  templateUrl: './list-products.html',
  styleUrl: './list-products.scss',
  providers: [DialogService],
})
export class ListProducts implements OnInit {
  private readonly _productService = inject(ProductService);
  private readonly _dialog = inject(DialogService);
  private readonly _toastr = inject(ToastrService);

  public products = signal<IProduct[]>([]);
  public ref: DynamicDialogRef<ModalProduct> | undefined;

  // Computed properties for stats
  public get totalProducts(): number {
    return this.products().length;
  }

  public get activeProducts(): number {
    return this.products().filter(p => p.estado === 1).length;
  }

  public get averagePrice(): string {
    if (this.products().length === 0) return '0.00';
    const total = this.products().reduce((sum, p) => sum + p.prodUltPrecio, 0);
    return (total / this.products().length).toFixed(2);
  }

  public modalProduct = signal<{ isVisible: boolean; data?: IProduct }>({
    isVisible: false,
    data: undefined,
  });
  public columns: IColumn[] = [
    {
      header: 'ID',
      field: 'prodId',
    },
    {
      header: 'Nombre',
      field: 'prodDescripcion',
    },
    {
      header: 'Precio',
      field: 'prodUltPrecio',
      format: {
        type: 'currency',
      },
    },
    {
      header: 'Fecha Creación',
      field: 'fechaHoraAct',
      format: {
        type: 'date',
        params: 'yyyy-MM-dd',
      },
    },
  ];

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
    this._productService.getListProducts().subscribe({
      next: (res) => {
        this.products.set(res.data ?? []);
      },
    });
  }

  accionEvent(data: IAccionOutput<IProduct>) {
    switch (data.type) {
      case 'editable':
        this.openModalProduct(data.data);
        break;
      case 'delete':
        this.deleteProduct(data.data);
        break;
    }
  }

  deleteProduct(product: IProduct) {
    if (confirm(`¿Estás seguro de que deseas eliminar el producto "${product.prodDescripcion}"?`)) {
      this._productService.deleteProduct(product.prodId.toString()).subscribe({
        next: (res) => {
          if (res.code.toString().includes('20')) {
            this._toastr.success('Producto eliminado exitosamente', 'Operación exitosa');
            this.listProducts(); // Recargar la lista
          } else {
            this._toastr.error(res.message || 'Error al eliminar el producto', 'Error');
          }
        },
        error: (err) => {
          this._toastr.error('Error al eliminar el producto', 'Error');
          console.error('Error deleting product:', err);
        }
      });
    }
  }

  createProduct() {
    this.openModalProduct();
  }

  openModalProduct(data?: IProduct) {
    this.ref = this._dialog.open(ModalProduct, {
      data,
      focusOnShow: false,
      header: data ? 'Editar producti' : 'Nuevo producto',
      maximizable: true,
      contentStyle: { overflow: 'auto' },
      modal: true,
      closable: true,
    });

    this.ref.onClose.subscribe(() => {
      this.listProducts();
    });
  }
}
