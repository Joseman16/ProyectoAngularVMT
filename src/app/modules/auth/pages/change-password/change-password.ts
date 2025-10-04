import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, MatInputModule, MatIconModule, MatInputModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss'
})
export class ChangePassword {

  private readonly _fb = inject(FormBuilder);
  private readonly _sharedService = inject(SharedService)

  private readonly _formChangePassword = this._fb.group({
    email: ['', [Validators.email, Validators.required]]
  })


  isValidControl(controlName: string){
    return this._sharedService.isValidControl(this._formChangePassword, controlName)
  }

  getError(controlName: string, label?: string){
    return this._sharedService.getError(this._formChangePassword, controlName, label)
  }

  get form(){
    return this._formChangePassword
  }

}
