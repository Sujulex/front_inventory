import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core'; // <-- 1. Importamos ChangeDetectorRef
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DashboardService } from '../../../shared/services/dashboard.service'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

  private dashboardService = inject(DashboardService);
  private cdr = inject(ChangeDetectorRef); // <-- 2. Inyectamos el detector de cambios

  // Variables dinámicas
  totalProducts: number = 0;
  totalCategories: number = 0;
  lowStock: number = 0;

  ngOnInit(): void {
    this.dashboardService.getStats().subscribe({
      next: (data) => {
        this.totalProducts = data.totalProducts;
        this.totalCategories = data.totalCategories;
        this.lowStock = data.lowStock;

        // 3. ¡LA MAGIA! Le ordenamos a Angular redibujar la pantalla INMEDIATAMENTE
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar estadísticas', err)
    });
  }
}
