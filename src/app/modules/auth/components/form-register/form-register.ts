import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
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
  public readonly isLoading = signal(false);
  public readonly passwordMinLength: number = 8;
  public readonly maxLength: number = 60;

  // ? Privates
  private readonly _formRegister = this._fb.group({
    firstNames: ['', [Validators.required, Validators.maxLength(this.maxLength)]],
    lastNames: ['', [Validators.required, Validators.maxLength(this.maxLength)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(this.passwordMinLength),
        Validators.maxLength(this.maxLength),
      ],
    ],
    repeatPassword: [
      '',
      [
        Validators.required,
        Validators.minLength(this.passwordMinLength),
        Validators.maxLength(this.maxLength),
        this.validatePasswordCompare('password'),
      ],
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
      if (!control.parent) {
        return null;
      }

      const otherControl = control.parent.get(controlName);
      if (!otherControl) {
        return null;
      }

      if (control.value !== otherControl.value) {
        return { misMatch: true };
      }

      return null;
    };
  }

  registerUser() {
    console.log('🔵 INICIO - Método registerUser ejecutado');
    console.log('📝 Form valid:', this._formRegister.valid);
    console.log('📋 Form value:', this._formRegister.value);
    console.log('📊 Form errors:', this._formRegister.errors);
    
    // Validar cada control
    Object.keys(this._formRegister.controls).forEach(key => {
      const control = this._formRegister.get(key);
      console.log(`Control ${key}:`, {
        valid: control?.valid,
        value: control?.value,
        errors: control?.errors
      });
    });

    // Validar Formulario
    if (this._formRegister.invalid) {
      this._formRegister.markAllAsTouched();
      this._toastr.error('Llena todos los campos correctamente', 'Formulario Inválido');
      console.log('❌ Formulario inválido - Deteniendo ejecución');
      return;
    }

    // Prevenir múltiples envíos
    if (this.isLoading()) {
      console.log('⏳ Ya hay una petición en curso');
      return;
    }

    console.log('✅ Formulario válido - Preparando petición');
    this.isLoading.set(true);
    
    const formValue = this._formRegister.value as IFormRegister;

    const payload: IRegister = {
      companyId: 1,
      email: formValue.email,
      name: `${formValue.firstNames} ${formValue.lastNames}`.trim(),
      password: formValue.password
    };

    console.log('📤 Payload preparado:', payload);
    console.log('🌐 Enviando petición...');

    this._authService.register(payload).subscribe({
      next: (res) => {
        console.log('✅ ÉXITO - Respuesta del servidor:', res);
        this._toastr.success('Usuario registrado exitosamente', 'Registro Exitoso');
        this._formRegister.reset();
        
        setTimeout(() => {
          console.log('🔄 Redirigiendo a login...');
          this._router.navigateByUrl(URL_ROUTES.LOGIN);
        }, 1500);
      },
      error: (err) => {
        console.error('❌ ERROR - Error completo:', err);
        console.error('📛 Status:', err.status);
        console.error('📛 StatusText:', err.statusText);
        console.error('📛 Error body:', err.error);
        console.error('📛 Message:', err.message);
        
        const errorMessage = err.error?.message || 
                           err.error?.title || 
                           err.message ||
                           'Ocurrió un error al registrar el usuario';
        
        this._toastr.error(errorMessage, 'Error en Registro');
        this.isLoading.set(false);
      },
      complete: () => {
        console.log('🏁 Petición completada');
        this.isLoading.set(false);
      }
    });
  }
}