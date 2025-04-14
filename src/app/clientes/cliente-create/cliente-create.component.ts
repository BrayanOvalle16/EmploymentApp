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
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { passwordRegex } from '../../shared/regex.constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-create',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    CommonModule,
    MatToolbarModule,
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
  templateUrl: './cliente-create.component.html',
  styleUrl: './cliente-create.component.css'
})
export class ClienteCreateComponent {
  file_store: FileList | undefined;
  file_list: Array<string> = [];
  display: FormControl = new FormControl("", Validators.required);

  email = new FormControl('', [Validators.required, Validators.email]);
  errorMessage = '';
  createButtonState = false;
  cliente : Client = new Client();
  credit : Credit = new Credit();
  cuotasDeCredito:any;
  aceptableAmount: any = null;
  acceptableCredit: any = null;
  monthlyPayment: any = null;
  hide=true;
  firstFormGroup = this.formBuilder.group({
    identificationNumber: [''],
    name: [''],
    lastName: [''],
    city: [''],
    dateOfBirth: [''],
    income: [''],
    email: ['',Validators.email],
    address: [''],
    password : ['', Validators.pattern(passwordRegex)],
    mobile: ['',  Validators.pattern('[0-9]{10}')]
  });

  userExistsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return this.validateUserExists(control.value) ? {incomeValidator: true} : null;
    }
  }

  validateUserExists(cantidad: any) {
      var incomeNumber : number = Number(this.cliente.ingresos);
      var cuotasNumber : number = Number(this.credit.numeroDeCuotas);
      var interestRate : number = this.getInterestRate(this.credit.tipo) /100;
      var creditNumber : number = Number(cantidad);
      var incomeAceptablePercent = incomeNumber * 0.7;
      var cuotasDeCredito = this.calcularCuotaEstimada(creditNumber, interestRate, cuotasNumber);
      this.aceptableAmount = Number(this.acceptableCredit / cuotasNumber) <= Number(cuotasDeCredito) ? cuotasDeCredito : null;
      this.acceptableCredit =  this.calcularMontoPrincipal(incomeAceptablePercent, interestRate, cuotasNumber );
      this.monthlyPayment = incomeAceptablePercent;
      console.log( Number(this.acceptableCredit / cuotasNumber));
      console.log(Number(cuotasDeCredito) );
      console.log(Number(incomeAceptablePercent) <= Number(cuotasDeCredito));
      return Number(incomeAceptablePercent) <= Number(cuotasDeCredito) ;
  }

  calcularCuotaEstimada(valorPrestamo: number, tasaInteresMensual: number, numCuotas: number): number {
    // Calcular la cuota mensual usando la fórmula de amortización
    const cuotaEstimada = valorPrestamo * (tasaInteresMensual / (1 - Math.pow(1 + tasaInteresMensual, -numCuotas)));

    return cuotaEstimada;
  }
  calcularMontoPrincipal(cuota: number, tasaInteresMensual: number, numMeses: number): number {
    // Calcular el monto principal usando la fórmula de amortización
    const montoPrincipal = cuota * (1 - Math.pow(1 + tasaInteresMensual, -numMeses)) / tasaInteresMensual;

    return montoPrincipal ;
  }

  getInterestRate(type: any) {
    switch (type){
      case "0" :
        return 1.1;
        break;
      case "3" :
        return 0.9;
        break;
      case "1" :
        return 1.7;
        break;
      case "2" :
        return 0.8;
        break;
      case "4" :
        return 1.5;
        break
      default :
        return 0;
      }
    }


  secondFormGroup = this.formBuilder.group({
    workProfile: ['', [Validators.required]]
  });

  constructor(private client: ServiceCreditApplicationService, private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private router:Router) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  ngOnInit(): void {

  }


  loading: boolean = false; // Nuevo estado de carga

  createCliente() {
    this.loading = true; // Iniciar loading
    this.createButtonState = true;

    this.client.saveClient(this.cliente, this.file_store?.item(0) as File).subscribe({
      next: (res) => {
        this.loading = false; // Ocultar loading al completar
        this.cliente.id = res.id;
        this._snackBar.open("Registro exitoso", "Ok");
        this.router.navigate(["/login-cliente"]);
      },
      error: (error) => {
        this.loading = false; // Ocultar loading en caso de error
        this.createButtonState = false;

        console.error(error);

        let errorMessage = "Error al crear el cliente";
        if (error.error) {
          errorMessage = error.error; // Mensaje desde el backend
        }

        this._snackBar.open(errorMessage, "Ok", {
          duration: 5000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }





  handleFileInputChange(l: FileList | null): void {
    if(l) {
      this.file_store = l;
      if (l.length) {
        const f = l[0];
        const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
        this.display.patchValue(`${f.name}${count}`);
      } else {
        this.display.patchValue("");
      }
    }
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }
}
