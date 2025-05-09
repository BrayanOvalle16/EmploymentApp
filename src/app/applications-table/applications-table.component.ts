import { Component } from '@angular/core';
import { Aplicacion } from '../Modelos/Aplicacion';
import { ServiceCreditApplicationService } from '../service/service-credit-application.service';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-applications-table',
  standalone: true,
  imports: [CommonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatCardModule,
    MatIcon,
    MatButton,
    ReactiveFormsModule ,
    MatListModule,
    CommonModule,
    CommonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  templateUrl: './applications-table.component.html',
  styleUrl: './applications-table.component.css'
})
export class ApplicationsTableComponent {
  applications: Aplicacion[] = [];
  empresaId: number | null = null;

  constructor(private service: ServiceCreditApplicationService, private authService: AuthService) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    
    if(userId) {
      // Obtener la empresa asociada al usuario
      this.service.getEmpresaByUserId(userId).subscribe({
        next: (empresa) => {
          this.empresaId = empresa.id;
          this.cargarAplicaciones();
        },
        error: (error) => console.error('Error al obtener la empresa', error)
      });
    }
  }

  cargarAplicaciones() {
    if (this.empresaId !== null) {
      this.service.getAplicacionesByEmpresaId(this.empresaId).subscribe(
        (data) => this.applications = data,
        (error) => console.error('Error al cargar aplicaciones', error)
      );
    }
  }

  descargarCv(clienteId: number) {
    this.service.descargarCv(clienteId).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cv.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => console.error('Error al descargar CV', error)
    );
  }
}