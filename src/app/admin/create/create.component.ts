import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Empresa } from '../../Modelos/Empresa';
import {ServiceCreditApplicationService} from "../../service/service-credit-application.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class RegistroEmpresaComponent {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  empresa!: Empresa; // Propiedad que almacena los datos mapeados
  loading: boolean = false; // Nuevo estado de carga

  constructor(private _formBuilder: FormBuilder,
              private client: ServiceCreditApplicationService,
              private _snackBar: MatSnackBar,
              private router:Router) {
    this.firstFormGroup = this._formBuilder.group({
      nombreEmpresa: ['', Validators.required],
      industria: ['', Validators.required],
      sitioWeb: ['', Validators.pattern('https?://.+')],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      descripcion: ['', Validators.required],
      tamano: [null, [Validators.required, Validators.min(1)]],
      anioFundacion: [
        null,
        [Validators.required, Validators.min(1800), Validators.max(new Date().getFullYear())]
      ],
      linkedin: ['', Validators.pattern('https?://.+')],
      twitter: ['', Validators.pattern('https?://.+')]
    });
  }

  registrarEmpresa(): void {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      // Mapeo al modelo `Empresa`
      this.empresa = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value
      };


      this.client.createEmpresa(this.empresa).subscribe({
        next: (res) => {
          this.loading = false; // Ocultar loading al completar
          this._snackBar.open("Registro exitoso", "Ok");
          this.router.navigate(["/login-cliente"]);
        },
        error: (error) => {
          this.loading = false; // Ocultar loading en caso de error

          console.error(error);

          let errorMessage = "Error al crear el usuario";
          if (error.error) {
            errorMessage = error.error; // Mensaje desde el backend
          }

          this._snackBar.open(errorMessage, "Ok", {
            duration: 5000,
            panelClass: ['snackbar-error']
          });
        }
      });

      console.log('Empresa registrada:', this.empresa);
      alert('Registro exitoso');
    } else {
      alert('Por favor complete todos los campos correctamente');
    }
  }
}
