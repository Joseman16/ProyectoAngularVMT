import { Component, inject, Input, signal } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { IProduct } from '../../interfaces/IProduct.interface';
import { FormProduct } from '../form-product/form-product';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-product',
  imports: [FormProduct, CommonModule],
  templateUrl: './modal-product.html',
  styleUrl: './modal-product.scss'
})
export class ModalProduct {
  public config = inject(DynamicDialogConfig)

  public product = signal<IProduct | undefined>(undefined)

  ngOnInit(){
    this.product.set(this.config.data)
  }




}
