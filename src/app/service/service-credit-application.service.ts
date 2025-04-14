import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../Modelos/Client';
import { Credit } from '../Modelos/Credit';
import { CreditChangeStatusDto } from '../Modelos/CreditChangeStatusDto';
import { Login } from '../Modelos/Login';
import { environment } from '../../environments/environment';
import { Pagos } from '../Modelos/Pagos';
import { PagosInfoByCliente } from '../Modelos/PagosInfoByCliente';
import {Empresa} from "../Modelos/Empresa";

@Injectable({
  providedIn: 'root'
})
export class ServiceCreditApplicationService {

  url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  login(login: Login) {
    return this.http.post<Client>(this.url + "/login", login);
  }

  loginAdmin(login: Login) {
    return this.http.post<Client>(this.url + "/login/admin", login);
  }

  saveClient(client: Client, cv: File) {
    const formData = new FormData();
    formData.append("file", cv); // Añadir el archivo
    formData.append("client", new Blob([JSON.stringify(client)], { type: "application/json" })); // Convertir el objeto client a JSON

    return this.http.post<Client>(this.url + "/Cliente/create", formData);
  }




  saveCredit(credit: Credit) {
    return this.http.post<Client>(this.url + "/Credito/create", credit);
  }

  savePayment(credit: Pagos) {
    return this.http.post<Pagos>(this.url + "/Pagos/payments", credit);
  }

  getNonApprevedCreditList() {
    return this.http.get<Credit>(this.url + "/Credito/non-approved-credits");
  }

  getPaymentByClientList(clientId : string) {
    return this.http.get<Pagos>(this.url + "/Pagos/payment-by-client?id=" + clientId);
  }

  getCreditInfoByClient(clientId : string) {
    return this.http.get<PagosInfoByCliente>(this.url + "/Credito/payment-by-client?id=" + clientId);
  }

  changeCreditStatus(request: CreditChangeStatusDto) {
    return this.http.put(this.url + "/Credito/update-state", request);
  }
  // Create a new Empresa
  createEmpresa(empresa: Empresa) {
    return this.http.post<Empresa>(this.url + "/Empresa/create", empresa);
  }

  // Get all Empresas
  getEmpresas() {
    return this.http.get<Empresa[]>(this.url);
  }

  // Get a single Empresa by ID
  getEmpresaById(id: string) {
    return this.http.get<Empresa>(`${this.url}/${id}`);
  }

  // Update an existing Empresa
  updateEmpresa(id: string, empresa: Partial<Empresa>) {
    return this.http.put<Empresa>(`${this.url}/${id}`, empresa);
  }

  // Delete an Empresa by ID
  deleteEmpresa(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
