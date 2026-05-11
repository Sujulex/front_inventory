import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  // 1. Inyectamos el HttpClient
  private readonly http = inject(HttpClient);
  
  // 2. Definimos la URI base para productos
  private readonly API_URL = `${environment.apiUrl}/products`;

  constructor() { }

  // Obtener todos los productos
  getProducts(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }

  // Buscar por ID
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }

  // Guardar (POST) - ¡Ojo aquí! Recibe un FormData, no un JSON
  saveProduct(data: FormData): Observable<any> {
    return this.http.post<any>(this.API_URL, data);
  }

  // Actualizar (PUT) - También recibe FormData por la imagen
  updateProduct(data: FormData, id: number): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${id}`, data);
  }

  // Eliminar (DELETE)
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }
}