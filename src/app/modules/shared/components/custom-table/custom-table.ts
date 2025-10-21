import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TableModule } from 'primeng/table';
import { IAccionOutput, IColumn, typeAccionOutput } from '../../interfaces/ICustomTable.interface';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-custom-table',
  imports: [TableModule, CurrencyPipe, DatePipe],
  templateUrl: './custom-table.html',
  styleUrl: './custom-table.scss'
})
export class CustomTable<T> {

  @Input({required: true}) data: T[] = []
  @Input({required: true}) columns: IColumn[]  = []

  @Input() editable: boolean = false;
  @Input() delete: boolean = false

  @Output() onAccionEmit: EventEmitter<IAccionOutput<T>> = new EventEmitter<IAccionOutput<T>>();

  onAccionEvent(accion: typeAccionOutput, data: T){
    this.onAccionEmit.emit({
      type: accion,
      data
    })
  }
}
