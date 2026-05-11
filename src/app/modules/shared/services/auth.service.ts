import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);
  // Ajusta la URL según cómo esté tu controlador en Spring Boot
 private readonly API_URL = 'http://localhost:8080/api/v1/auth/login'; 

  constructor() { }

  // Envía las credenciales al backend
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(this.API_URL, credentials);
  }

  // Guarda el token en el almacenamiento del navegador
  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // Obtiene el token guardado
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Cierra sesión borrando el token
  logout(): void {
    localStorage.removeItem('token');
  }

  // Verifica si hay una sesión activa
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}