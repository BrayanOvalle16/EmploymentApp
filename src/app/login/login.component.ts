import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormsModule, ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {merge} from 'rxjs';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {CommonModule, CurrencyPipe } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

import {MatStepperModule} from '@angular/material/stepper';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { ServiceCreditApplicationService } from '../service/service-credit-application.service';
import { AuthService } from '../service/auth.service';
import { rolesDto } from '../Modelos/rolesDto';
import { Login } from '../Modelos/Login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatStepperModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login = new Login();
  hide=true;
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  cliente : any;

  @Input() isAdminLogin: boolean = true;

  constructor(private client: ServiceCreditApplicationService, private _snackBar: MatSnackBar,
              private router: Router, private authService: AuthService) {
  }

  submit() {
    if (this.form.valid ) {
      this.authService.login(this.login).subscribe(res => {
        this._snackBar.open("Login Correcto", "Ok");
        this.cliente = res;
        this.redirectBasedOnRol(this.authService.getRoles());
      }, err => {
        this._snackBar.open("Usuario No Encotrado", "Ok");
      });
    }
  }

  redirectBasedOnRol(roles: string[]) {
    if(roles.some(e => e === rolesDto.admin.valueOf())) {
      this.router.navigate(['/empresa/crear-postulacion']);
    } else {
      this.router.navigate(['/dashboard/chat']);
    }
  }
  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();
}
