import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// ? Modulos de Prime NG
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { Ripple } from 'primeng/ripple';
@Component({
  selector: 'app-toolbar',
  imports: [CommonModule, MenubarModule, BadgeModule, AvatarModule, InputTextModule, Ripple],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {

  @Input() items: MenuItem[] | undefined;
  ngOnInit() {

  }
}
