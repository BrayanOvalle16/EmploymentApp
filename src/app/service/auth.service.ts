import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Login } from '../Modelos/Login';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = environment.apiUrl + '/api/v1/auth/signin'; // Your backend authentication endpoint
  private readonly tokenKey = 'auth_token';
  constructor(private http: HttpClient) { }
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  login(credentials: Login) {
    return this.http.post<any>(this.authUrl, credentials)
      .pipe(
        // Maneja la respuesta del servidor
        tap(response => {
          // Si la respuesta incluye un token de autenticación
          if (response.accessToken) {
            // Almacena el token en el almacenamiento local
            this.isAuthenticatedSubject.next(true);
            localStorage.setItem(this.tokenKey, response.accessToken);
          }
        })
      );
  }

  getId() {
    const helper = new JwtHelperService();
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const decodedToken = helper.decodeToken(token);
      const roles = decodedToken['sub'];
      return roles;
    }
    return null;
  }
  
  getRoles() {
    const helper = new JwtHelperService();
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const decodedToken = helper.decodeToken(token);
      const roles = decodedToken['roles'];
      return roles;
    }
    return null;
  }
  // Método para cerrar sesión
  logout(): void {
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem(this.tokenKey);
  }

  // Método para obtener el token de autenticación
  getToken(): string | null {
    // Obtenemos el token del almacenamiento local
    return localStorage.getItem(this.tokenKey);
  }

  isExpired() {
    const helper = new JwtHelperService();
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const tokenPayload = helper.decodeToken(token);
      const expirationDate = new Date(tokenPayload.exp * 1000);
      return expirationDate <= new Date();
    }
    return false;
  }
  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
