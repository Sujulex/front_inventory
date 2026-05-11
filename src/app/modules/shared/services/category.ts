import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'; // Ajusta los ../ si es necesario
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  // 1. Inyectamos el HttpClient
  private readonly http = inject(HttpClient);
  
  // 2. Definimos la URL base (revisa si tu backend de Spring Boot usa /categories o /category)
  private readonly API_URL = `${environment.apiUrl}/categories`; 

  constructor() { }

  // Obtener todas las categorías
  getCategories(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }

  // Buscar por ID
  getCategoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }

  // Guardar (POST) - Recibe el JSON directo
  saveCategory(data: any): Observable<any> {
    return this.http.post<any>(this.API_URL, data);
  }

  // Actualizar (PUT) - Recibe el JSON y el ID
  updateCategory(data: any, id: number): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${id}`, data);
  }

  // Eliminar (DELETE)
  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }
}