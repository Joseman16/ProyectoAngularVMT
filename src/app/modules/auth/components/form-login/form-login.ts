import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedService } from '../../../shared/services/shared.service';
import { IFormLogin } from '../../interfaces/IFormLogin.interface';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../../../shared/services/localStorage.service';
import { EnumKeys } from '../../../shared/enums/keys';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './form-login.html',
  styleUrls: ['./form-login.scss'],
})
export class FormLogin {
  public readonly hide = signal(true);
  public readonly localStorage = inject(LocalStorageService);
  private readonly _fb = inject(FormBuilder);
  private readonly _sharedService = inject(SharedService);
  private readonly _toastr = inject(ToastrService);

  @Output() onFormValue: EventEmitter<IFormLogin> = new EventEmitter<IFormLogin>();
  @Output() onRedirect: EventEmitter<string> = new EventEmitter<string>();

  private readonly _formLogin: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rememberme: [false]
  });

  constructor() {
    const saved = this.localStorage.getItem<IFormLogin>(EnumKeys.RECUERDAME);
    if (saved) this._formLogin.patchValue(saved);
  }

  get getFormLogin() {
    return this._formLogin;
  }

  isValidControl(controlName: string) {
    return this._sharedService.isValidControl(this._formLogin, controlName);
  }

  getError(controlName: string, label?: string): string {
    return this._sharedService.getError(this._formLogin, controlName, label);
  }

  onLogin(event: Event) {
    event.preventDefault(); // Evita que el form recargue la página
    if (this._formLogin.invalid) {
      this._toastr.error('Llena todos los campos correctamente', 'Formulario inválido');
      return;
    }
    console.log('Form enviado:', this._formLogin.value); // Debug
    this.onFormValue.emit(this._formLogin.value as IFormLogin);
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  redirect(path: string) {
    this.onRedirect.emit(path);
  }
}
