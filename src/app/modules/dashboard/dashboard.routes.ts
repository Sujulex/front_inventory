import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard.component';
// 1. Importa tu componente de productos
import { ProductComponent } from './components/product/product';

export const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => 
            import('./pages/dashboard.component').then(m => m.DashboardComponent),

        children: [

            {   
                path: '',
                loadComponent: () => 
                    import('./components/home/home').then(m => m.HomeComponent)
            },

            {   
                path: 'home',
                loadComponent: () => 
                    import('./components/home/home').then(m => m.HomeComponent)
            },
            
                {   
                path: 'category',
                loadChildren: () => 
                    import('../category/category-module').then(m => m.CategoryModule)
            },

                { path: 'product', component: ProductComponent },
        ]
            }
        ];