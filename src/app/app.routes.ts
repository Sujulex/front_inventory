import { Routes } from '@angular/router';

export const routes: Routes = [
  // 1. Al entrar a la raíz (localhost:4200), ahora te enviará al Login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  
  // 2. Cargamos la pantalla de Login bajo demanda
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/auth/components/login/login').then(m => m.LoginComponent)
  },

  // 3. Mantenemos tu ruta del Dashboard intacta
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
  }
];

