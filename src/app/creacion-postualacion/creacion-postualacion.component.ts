import { Component, OnInit } from '@angular/core';

import { ReactiveFormsModule, FormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ServiceCreditApplicationService } from '../service/service-credit-application.service';
import { Empresa } from '../Modelos/Empresa';
import { OfertaTrabajo } from '../Modelos/OfertaTrabajo';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-creacion-postulacion',
  templateUrl: './creacion-postualacion.component.html',
  standalone: true,
  imports: [
    MatSnackBarModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule
  ],
  styleUrls: ['./creacion-postualacion.component.css']
})
export class CreacionPostulacionComponent implements OnInit {
  ofertaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ServiceCreditApplicationService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.ofertaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      requisitos: ['', Validators.required],
      salario: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {}

  crearOferta(): void {
    const userId = this.authService.getUserId();

    if (!userId) {
      this.snackBar.open('No se pudo obtener la empresa del token', 'Cerrar', { duration: 3000 });
      return;
    }

    this.service.getEmpresaByUserId(userId).subscribe({
      next: (empresa: Empresa) => {
        const formValues = this.ofertaForm.value;

        const nuevaOferta: OfertaTrabajo = {
          titulo: formValues.titulo,
          descripcion: formValues.descripcion,
          requisitos: formValues.requisitos,
          salario: formValues.salario,
          empresa: empresa
        };

        this.service.createOfertaTrabajo(nuevaOferta).subscribe({
          next: () => {
            this.snackBar.open('Oferta creada exitosamente', 'Cerrar', { duration: 3000 });
            this.ofertaForm.reset();
          },
          error: () => {
            this.snackBar.open('Error al crear la oferta', 'Cerrar', { duration: 3000 });
          }
        });
      },
      error: () => {
        this.snackBar.open('Error al obtener la empresa', 'Cerrar', { duration: 3000 });
      }
    });
  }
}