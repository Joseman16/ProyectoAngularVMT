import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Loader } from '../../../shared/components/loader/loader';

import { IBrand } from '../../../brand/interfaces/IBrand.interface';
import { ICategory } from '../../../category/interfaces/ICategory.interface';
import { ICompany } from '../../../company/interfaces/ICompany.interface';
import { IFormProduct } from '../../interfaces/IFormProduct.interface';
import { IProduct } from '../../interfaces/IProduct.interface';
import { ISupplier } from '../../../supplier/interfaces/ISupplier.interface';

import { BrandService } from '../../../brand/services/brand.service';
import { CategoryService } from '../../../category/services/category.service';
import { CompanyService } from '../../../company/services/company.service';
import { SupplierService } from '../../../supplier/services/supplier.service';

import { ButtonModule } from 'primeng/button';
import { Fluid } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { KeyFilterModule } from 'primeng/keyfilter';
import { Select } from 'primeng/select';
import { SharedService } from '../../../shared/services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { IUpdateProduct } from '../../interfaces/IUpdateProduct.interface';
import { ProductService } from '../../services/product.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OnlyNumbersDirective } from '../../../shared/directives/onlyNumbers.directive';

@Component({
  selector: 'app-form-product',
  imports: [
    ButtonModule,
    InputTextModule,
    InputNumber,
    KeyFilterModule,
    ReactiveFormsModule,
    Select
  ],
  templateUrl: './form-product.html',
  styleUrl: './form-product.scss',
})
export class FormProduct implements OnInit {
  @Input() product?: IProduct;

  private readonly _fb = inject(FormBuilder);
  private readonly _companyService = inject(CompanyService);
  private readonly _categoryService = inject(CategoryService);
  private readonly _supplierService = inject(SupplierService);
  private readonly _brandService = inject(BrandService);
  private readonly _sharedService = inject(SharedService);
  private readonly _toastr = inject(ToastrService);
  private readonly _productService = inject(ProductService);

  private _dialog = inject(DynamicDialogRef)

  private readonly _formProduct: FormGroup;

  public categories = signal<ICategory[]>([]);
  public companies = signal<ICompany[]>([]);
  public suppliers = signal<ISupplier[]>([]);
  public brands = signal<IBrand[]>([]);

  constructor() {
    this._formProduct = this.createFormProducto();
  }
  ngOnInit(): void {
    if (this.product) {
      this._formProduct.patchValue(this.setFormProductValues(this.product));
    }
    this._categoryService.getListCategory().subscribe({
      next: (listCategory) => {
        this.categories.set(listCategory.data ?? []);
      },
    });
    this._companyService.getListCompany().subscribe({
      next: (listCompany) => {
        this.companies.set(listCompany.data ?? []);
      },
    });
    this._supplierService.getListSuppliers().subscribe({
      next: (listSupplier) => {
        this.suppliers.set(listSupplier.data ?? []);
      },
    });
    this._brandService.getListBrands().subscribe({
      next: (listBrand) => {
        this.brands.set(listBrand.data ?? []);
      },
    });
  }

  setFormProductValues(value: IProduct): IFormProduct {
    return {
      prodDescripcion: value.prodDescripcion,
      prodUltPrecio: value.prodUltPrecio,
      categoriaId: value.categoriaId,
      marcaId: value.marcaId,
      empresaId: value.empresaId,
      proveedorId: value.proveedorId,
    };
  }

  createFormProducto() {
    return this._fb.group({
      prodDescripcion: ['', [Validators.required]],
      prodUltPrecio: [0, [Validators.required]],
      categoriaId: [0, [Validators.required]],
      empresaId: [0, [Validators.required]],
      proveedorId: [0, [Validators.required]],
      marcaId: [0, [Validators.required]],
    });
  }

  get formProduct() {
    return this._formProduct;
  }

  get alphaNumericSpace() {
    return this._sharedService.alphaNumericSpace;
  }

  saveProduct() {
    if (this.formProduct.invalid) {
      this._toastr.warning('Complete todos los campos requeridos', 'Formulario inválido');
      this.markFormGroupTouched();
      return;
    }
    const valueForm = this._formProduct.value as IFormProduct;

    if (valueForm.prodUltPrecio <= 0) {
      this._toastr.warning('El precio debe ser mayor a cero', 'Campo inválido');
      return;
    }

    // Validar que se hayan seleccionado valores válidos para los selects
    if (valueForm.categoriaId === 0 || valueForm.empresaId === 0 || valueForm.proveedorId === 0 || valueForm.marcaId === 0) {
      this._toastr.warning('Por favor seleccione todos los campos requeridos', 'Campos incompletos');
      return;
    }

    const payload: IUpdateProduct = valueForm;

    if (this.product) {
      // Actualizar producto existente
      this._productService
        .putUpdateProduct(this.product.prodId.toString(), payload)
        .subscribe({
          next: (res) => {
            this._toastr.success('Producto actualizado exitosamente', 'Operación exitosa');
            this._dialog.close();
          },
          error: (err) => {
            this._toastr.error('Error al actualizar el producto', 'Error');
            console.error('Error updating product:', err);
          }
        });
    } else {
      // Crear nuevo producto
      this._productService
        .postCreateProduct(payload).subscribe({
          next: (res) => {
            this._toastr.success('Producto creado exitosamente', 'Operación exitosa');
            this._dialog.close();
          },
          error: (err) => {
            this._toastr.error('Error al crear el producto', 'Error');
            console.error('Error creating product:', err);
          }
        })
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.formProduct.controls).forEach(key => {
      const control = this.formProduct.get(key);
      control?.markAsTouched();
    });
  }

  onClose(){
    console.log('ENtra')
    this._dialog.close()
  }
}
