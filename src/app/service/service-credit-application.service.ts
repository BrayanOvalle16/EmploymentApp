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
import { OfertaTrabajo } from '../Modelos/OfertaTrabajo';
import { Aplicacion } from '../Modelos/Aplicacion';

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

  getEmpresaByUserId(userId: number) {
    return this.http.get<Empresa>(`${this.url}/Empresa/by-user/${userId}`);
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

  sendMessage(chatId: string, message: string) {
    const url = `${this.url}/chat/${chatId}`;
    const body = { message };
    return this.http.post<{ response: string }>(url, body);
  }

  createOfertaTrabajo(oferta: OfertaTrabajo) {
    oferta.empresa.user = null;
    return this.http.post<OfertaTrabajo>(`${this.url}/api/ofertas/crear`, oferta);
  }

  // Obtener todas las ofertas
  getOfertas() {
    return this.http.get<OfertaTrabajo[]>(`${this.url}/api/ofertas/`);
  }

  // Aplicar a una oferta
  aplicarOferta(ofertaId: number, clienteId: number) {
    return this.http.post(`${this.url}/api/ofertas/${ofertaId}/aplicar?clienteId=${clienteId}`, {});
  }


  getClienteByUserId(userId: number) {
    return this.http.get<Client>(`${this.url}/Cliente/by-user/${userId}`);
  }

    // Obtener aplicaciones de la empresa por ID
    getAplicacionesByEmpresaId(empresaId: number) {
      return this.http.get<Aplicacion[]>(`${this.url}/api/ofertas/empresa/${empresaId}/aplicaciones`);
    }

    // Descargar CV de un cliente
    descargarCv(clienteId: number) {
      return this.http.get<Blob>(`${this.url}/api/ofertas/cv/${clienteId}`, { responseType: 'blob' as 'json' });
    }
}
