import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLinkWithHref, Router } from "@angular/router"; // <-- 1. Importamos Router
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

// 2. Importamos tu servicio de autenticación (Ajusta la ruta según tus carpetas)
import { AuthService } from '../../../shared/services/auth.service'; 

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    MatSidenavModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatListModule,
    MatMenuModule, 
    RouterLinkWithHref
  ],
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.css'],
})
export class Sidenav {

  // Inyectamos los servicios usando la función moderna inject()
  private authService = inject(AuthService);
  private router = inject(Router);

  menuNav = [
    { name: 'Home', route: 'home', icon: 'home' },
    { name: 'Categorías', route: 'category', icon: 'category' },
    { name: 'Productos', route: 'product', icon: 'production_quantity_limits' },
  ];

  mobileQuery: MediaQueryList;
  
  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  // 3. CREAMOS LA FUNCIÓN DE LOGOUT
  onLogout(): void {
    // Limpiamos los datos de sesión (token)
    this.authService.logout();

    // Redirigimos al usuario a la pantalla de login
    this.router.navigate(['/login']);
  }
}
