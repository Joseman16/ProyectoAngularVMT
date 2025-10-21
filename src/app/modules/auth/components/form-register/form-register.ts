import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { SharedService } from '../../../shared/services/shared.service';
import { CommonModule } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { IRegister } from '../../interfaces/IRegister.interface';
import { IFormRegister } from '../../interfaces/IFormRegister.interface';
import { Router } from '@angular/router';
import { URL_ROUTES } from '../../../shared/const/url-routes';

@Component({
  selector: 'app-form-register',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormField,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './form-register.html',
  styleUrl: './form-register.scss',
})
export class FormRegister {

  // ? Injects
  private readonly _fb = inject(FormBuilder);
  private readonly _sharedService = inject(SharedService);
  private readonly _toastr = inject(ToastrService);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  // ? Outputs
  @Output() onFormRegister = new EventEmitter();
  @Output() onRedirect: EventEmitter<string> = new EventEmitter<string>();

  // ? Publics
  public readonly hide = signal(true);
  public readonly passwordMinLength: number = 8;
  public readonly maxLength: number = 60;

  // ? Privates
  private readonly _formRegister = this._fb.group({
    firstNames: ['', [Validators.required, Validators.maxLength(this.maxLength)], []],
    lastNames: ['', [Validators.required, Validators.maxLength(this.maxLength)], []],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(this.passwordMinLength),
        Validators.maxLength(this.maxLength),
      ],
      [],
    ],
    repeatPassword: [
      '',
      [
        Validators.required,
        Validators.minLength(this.passwordMinLength),
        Validators.maxLength(this.maxLength),
        this.validatePasswordCompare('password'),
      ],
      [],
    ],
  });

  get formRegister() {
    return this._formRegister;
  }

  getError(controlName: string, label?: string) {
    return this._sharedService.getError(this._formRegister, controlName, label);
  }

  isValidControl(controlName: string) {
    return this._sharedService.isValidControl(this._formRegister, controlName);
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onRegister() {
    if (this._formRegister.invalid) return;
    this.onFormRegister.emit(this._formRegister.value);
  }

  redirect(path: string) {
    this.onRedirect.emit(path);
  }

  validatePasswordCompare(controlName: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      // ? Valida que el contralador principal exista
      if (!control.parent) {
        return null; // aún no está inicializado
      }

      // ? Valida que el segundo controlador exista
      const otherControl = control.parent.get(controlName);
      if (!otherControl) {
        return null;
      }

      // ? Comparar contraseñas
      if (control.value !== otherControl.value) {
        return {
          misMatch: true,
        }; // ❌ no coinciden
      }

      return null;
    };
  }

  registerUser() {
    // ? Validar Formulario
    if(this._formRegister.invalid) {
      this._toastr.error('Llena todos los campos', 'Formulario Inválido')
      return
    }
    const formValue = this._formRegister.value as IFormRegister;

    const payload: IRegister = {
      companyId: 1,
      email: formValue.email,
      name: `${formValue.firstNames} ${formValue.lastNames}`,
      password: formValue.password
    };
    this._authService.register(payload).subscribe({
      next: ( res ) => {
        this._router.navigateByUrl(URL_ROUTES.LOGIN)
      },
      error: ( err ) => {
        this._router.navigateByUrl(URL_ROUTES.LOGIN)
      },
      complete: () => {

      }
    })
  }
}
