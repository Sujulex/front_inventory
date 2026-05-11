import { Component, OnInit, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../../../../shared/services/category';

@Component({
  selector: 'app-new-category',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, 
    MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './new-category.html',
  styleUrl: './new-category.css'
})
export class NewCategory implements OnInit {

  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private dialogRef = inject(MatDialogRef<NewCategory>);
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  public categoryForm!: FormGroup;
  estadoFormulario: string = 'Agregar Nueva';

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

   if (this.data != null) {
  this.estadoFormulario = 'Editar';
  this.categoryForm.patchValue({
    // Asignamos al revés a propósito para compensar el cruce que viene de Java
    name: this.data.description,      // El input 'name' recibe la descripción de Java (que es el nombre real)
    description: this.data.name       // El input 'description' recibe el name de Java (que es la descripción real)
  });
}
  }

  onSave() {
    if (this.data != null) {
      // 1. CASO EDITAR: Invertimos los datos antes de mandarlos a Java
      const updateValues = {
        name: this.categoryForm.value.description, // Mandamos la descripción en el campo name
        description: this.categoryForm.value.name  // Mandamos el nombre en el campo description
      };

      this.categoryService.updateCategory(updateValues, this.data.id).subscribe({
        next: (res) => {
          this.dialogRef.close(1);
        },
        error: (err) => console.log('Error actualizando categoría', err)
      });

    } else {
      // 2. CASO NUEVA: Se manda normal porque nos confirmaste que ahí sí funciona bien
      const newValues = this.categoryForm.value;

      this.categoryService.saveCategory(newValues).subscribe({
        next: (res) => {
          this.dialogRef.close(1);
        },
        error: (err) => console.log('Error guardando categoría', err)
      });
    }
  }

  onCancel() {
    this.dialogRef.close(2);
  }
}