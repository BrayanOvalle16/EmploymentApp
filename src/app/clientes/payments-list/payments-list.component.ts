import { Component } from '@angular/core';
import { ServiceCreditApplicationService } from '../../service/service-credit-application.service';
import {MatTableModule} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-payments-list',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatButtonModule, CommonModule ],
  templateUrl: './payments-list.component.html',
  styleUrl: './payments-list.component.css'
})
export class PaymentsListComponent {
  displayedColumns: string[] = ['id', 'cantidad', 'paymentDate'];
  dataSource : any;
  creditInfo : any;
  clienteId: any;
  pagoMinimoActive = true;

  constructor(private client: ServiceCreditApplicationService, private route: ActivatedRoute,  private router:Router) {
    this.route.params.subscribe(params => {
      this.clienteId = params['id'];
      this.getData();
      this.getCreditData(this.clienteId);
    })
  }

  pagar(cantidad: string) {
    this.router.navigate(['cliente-pago/creditoId/:id/cantidadPagar/:cantidad', {id: this.creditInfo.id, cantidad: cantidad, clientId : this.clienteId}]);
  }

  getCreditData(creditId : string) {
    this.client.getCreditInfoByClient(creditId).subscribe(res => {
      this.creditInfo = res;
      if(res && res.fechaPago) {
        var date = new Date(res.fechaPago);
        var fechaActual = new Date();
        if (fechaActual < date) {
          this.pagoMinimoActive = false;
        }
      }
    })
  }

  getData() {
    this.client.getPaymentByClientList(this.clienteId).subscribe(res => {
      this.dataSource = res;
    })
  }
}
