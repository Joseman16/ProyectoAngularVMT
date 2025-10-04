import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from '../../components/toolbar/toolbar';
import { LayoutService } from '../../services/layout.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, Toolbar],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {

  private readonly _layoutService = inject(LayoutService)

  public items =  signal<MenuItem[]>([])

  constructor(){
    this._layoutService.getRoutes().subscribe({
      next: (res) => {
        this.items.set(res)
      }
    })
  }

}
