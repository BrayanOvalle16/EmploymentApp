import { Routes } from '@angular/router';
import {ClienteCreateComponent} from "./clientes/cliente-create/cliente-create.component";
import { NavBarComponent } from './utils/nav-bar/nav-bar.component';
import { CreditListComponent } from './admin/credit-list/credit-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './utils/Guards/AuthGuard';
import { AuthAdminGuard } from './utils/Guards/AuthAdminGuard';
import { PaymentsListComponent } from './clientes/payments-list/payments-list.component';
import { PagoComponent } from './pagos/pago/pago.component';
import {RegistroEmpresaComponent} from "./admin/create/create.component";
import { ChatComponent } from './admin/chat/chat.component';
import { CreacionPostulacionComponent } from './creacion-postualacion/creacion-postualacion.component';
import { PostularseComponent } from './postularse/postularse.component';
import { ApplicationsTableComponent } from './applications-table/applications-table.component';

export const routes: Routes = [
  {path: '', component:ClienteCreateComponent},
  {path: 'registro-empresa', component:RegistroEmpresaComponent},
  { path: 'login-cliente', component: LoginComponent},
  { path: 'cliente-dashboard/:id', component: ClienteCreateComponent, canActivate: [AuthGuard]},
  { path: 'empresa/crear-postulacion', component: CreacionPostulacionComponent},
  { path: 'dashboard/postularse', component: PostularseComponent},
  { path: 'empresa/listar-postulacion', component: ApplicationsTableComponent},
  
  { path: 'dashboard/chat', component: ChatComponent},
  { path: 'cliente-pago/creditoId/:id/cantidadPagar/:cantidad', title: "pagar", component: PagoComponent, canActivate: [AuthGuard]},

];
