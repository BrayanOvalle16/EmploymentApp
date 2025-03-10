import { Component } from '@angular/core';
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
import { CurrencyPipe } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { ServiceCreditApplicationService } from '../../service/service-credit-application.service';
import { Client } from '../../Modelos/Client';
import {MatSelectModule} from '@angular/material/select';
import { Credit } from '../../Modelos/Credit';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router } from '@angular/router';
import { Pagos } from '../../Modelos/Pagos';
@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatStepperModule
  ],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
})
export class PagoComponent {
  credit = new Pagos();
  creditoId: any;
  clientId : any;
  firstFormGroup = this.formBuilder.group({
    totalPagar: [''],
    banco: [''],
    nombre: [''],
    numeroIdentificacion: [''],
    correoElectronico: [''],
  });

  constructor(private client: ServiceCreditApplicationService, private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private _snackBar: MatSnackBar, private router:Router) {
    this.route.params.subscribe(params => {
      this.credit.credito = new Credit();
      this.credit.credito.id = params['id'];
      this.clientId = params['clientId'];
      this.credit.cantidad = params['cantidad'];
    })
  }

  submit() {
    this.credit.fechaPago = new Date();
    this.client.savePayment(this.credit).subscribe(res => {
      this.router.navigate(['/cliente-dashboard', this.clientId]);
    });
  }

}
