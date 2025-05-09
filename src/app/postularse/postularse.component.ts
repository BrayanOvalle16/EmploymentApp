import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OfertaTrabajo } from '../Modelos/OfertaTrabajo';
import { ServiceCreditApplicationService } from '../service/service-credit-application.service';
import { AuthService } from '../service/auth.service';
import { Client } from '../Modelos/Client';

import {MatCardModule} from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-postularse',
  templateUrl: './postularse.component.html',
  standalone: true,
  imports :[
    MatCardModule,
    MatInputModule,
    MatFormFieldModule, 
    FormsModule,
    MatIcon,
    MatButton,
    ReactiveFormsModule ,
    MatListModule,
    CommonModule,
    MatFormField,
    CommonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  styleUrls: ['./postularse.component.css']
})
export class PostularseComponent implements OnInit {
  ofertas: OfertaTrabajo[] = [];
  filteredOfertas: OfertaTrabajo[] = [];
  filtro = new FormControl('');
  filtroForm: FormGroup;
  clienteId!: number;

  constructor(
    private service: ServiceCreditApplicationService,
    private authService: AuthService
  ) {
    this.filtroForm = new FormGroup({
      filtro: this.filtro,
    });
  }

  ngOnInit(): void {
    // Load user data and job offers
    this.loadClientData();
    this.loadOfertas();
  }

  loadClientData() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.service.getClienteByUserId(userId).subscribe({
        next: (cliente: Client) => {
          if (cliente.id) {
            this.clienteId = cliente.id;
          }
        },
        error: (err: any) => console.error('Error al obtener cliente', err),
      });
    } else {
      console.error('Usuario no autenticado');
    }
  }

  loadOfertas() {
    this.service.getOfertas().subscribe({
      next: (data: OfertaTrabajo[]) => {
        this.ofertas = data;
        this.filteredOfertas = data;
      },
      error: (err: any) => {
        console.error('Error al cargar ofertas', err);
      },
    });
  }

  filtrarOfertas(keyword?: string | null) {
    if (!keyword) {
      this.filteredOfertas = this.ofertas;
    } else {
      const regex = new RegExp(keyword.replace(/[*?]/g, (char) => {
        return char === '*' ? '.*' : '.';
      }), 'i');
  
      this.filteredOfertas = this.ofertas.filter((o) =>
        regex.test(o.titulo) ||
        regex.test(o.descripcion) ||
        regex.test(o.requisitos) ||
        regex.test(o.salario.toString())
      );
    }
  }
  
  aplicar(ofertaId: number) {
    if (!this.clienteId) {
      console.error('ID del cliente no disponible');
      return;
    }
    
    this.service.aplicarOferta(ofertaId, this.clienteId).subscribe({
      next: () => {
        alert('Postulación exitosa');
        this.filteredOfertas = this.filteredOfertas.filter(o => o.id !== ofertaId);
      },
      error: (err: any) => console.error('Error al postularse', err),
    });
  }
}