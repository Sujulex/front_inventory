import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductService } from '../../../shared/services/product';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewProductComponent } from './new-product/new-product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatDialogModule
  ],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class ProductComponent implements OnInit {

  private productService = inject(ProductService);
  private dialog = inject(MatDialog); // <-- Movido aquí arriba por orden

  // Definimos las columnas que se mostrarán en el HTML
  displayedColumns: string[] = ['id', 'name', 'price', 'account', 'category', 'picture', 'actions'];
  
  // Usamos MatTableDataSource para poder filtrar los datos fácilmente
  dataSource = new MatTableDataSource<any>();

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        // Asignamos la lista de productos al dataSource de la tabla
        this.dataSource.data = data.productResponse.products; 
      },
      error: (error: any) => {
        console.error("Error al obtener productos:", error);
      }
    });
  }

  // Método para el buscador
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // 1. Función para ELIMINAR
  delete(id: number): void {
    // Usamos un confirm básico por ahora (luego podemos poner uno más bonito)
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      this.productService.deleteProduct(id).subscribe({
        next: (response) => {
          console.log('Eliminado exitosamente');
          this.getProducts(); // Recargamos la tabla para que desaparezca el registro
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
        }
      });
    }
  }

  // 2. Función para AGREGAR (Abrir modal vacío)
  openDialog(): void {
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px' // Le damos un ancho al formulario
    });

    // Escuchamos cuando se cierre el modal
    dialogRef.afterClosed().subscribe(result => {
      if(result === 1) { // Si el formulario devuelve 1 (éxito), recargamos la tabla
        this.getProducts(); 
      }
    });
  }

  // 3. Función para EDITAR (Abrir modal con datos)
  edit(element: any): void {
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px',
      data: element // Le pasamos la fila completa al formulario para que se llene
    });

    // Escuchamos cuando se cierre el modal
    dialogRef.afterClosed().subscribe(result => {
      if(result === 1) {
        this.getProducts(); 
      }
    });
  }
}