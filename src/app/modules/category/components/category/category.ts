import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CategoryService } from '../../../shared/services/category';
import { MatCardModule } from '@angular/material/card'; 
import { NewCategory } from '../../../dashboard/components/category/new-category/new-category';



@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatDialogModule,
    MatCardModule
  ],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class CategoryComponent implements OnInit {

  private categoryService = inject(CategoryService);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<any>();

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: any) => {
        this.dataSource.data = data.categoryResponse.category; 
      },
      error: (error: any) => {
        console.error("Error al obtener categorías:", error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // 1. ELIMINAR
  delete(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: (response) => {
          console.log('Categoría eliminada');
          this.getCategories(); // Recarga la tabla
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
        }
      });
    }
  }

  // 2. AGREGAR (Abre el modal usando la clase correcta: NewCategory)
  openDialog(): void {
    const dialogRef = this.dialog.open(NewCategory, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 1) { 
        this.getCategories(); 
      }
    });
  }

  // 3. EDITAR (Abre el modal usando la clase correcta: NewCategory)
  edit(element: any): void {
    const dialogRef = this.dialog.open(NewCategory, {
      width: '450px',
      data: element 
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 1) {
        this.getCategories(); 
      }
    });
  }
}