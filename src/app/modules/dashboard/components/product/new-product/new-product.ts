import { Component, OnInit, inject, Inject, ChangeDetectorRef } from '@angular/core'; // <-- 1. Agregamos ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ProductService } from '../../../../shared/services/product';
import { CategoryService } from '../../../../shared/services/category'; 

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, 
    MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule
  ],
  templateUrl: './new-product.html', 
  styleUrls: ['./new-product.css']
})
export class NewProductComponent implements OnInit {

  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private dialogRef = inject(MatDialogRef<NewProductComponent>);
  private cdr = inject(ChangeDetectorRef); // <-- 2. Inyectamos el detector de cambios
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  public productForm!: FormGroup;
  estadoFormulario: string = 'Agregar Nuevo';
  categorias: any[] = [];
  imagenSeleccionada: File | null = null; 

  ngOnInit(): void {
    this.getCategories(); 
    
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      account: ['', Validators.required],
      categoryId: ['', Validators.required],
      picture: [''] 
    });

    if (this.data != null) {
      this.estadoFormulario = 'Editar';
      this.productForm.patchValue({
        name: this.data.name,
        price: this.data.price,
        account: this.data.account,
        categoryId: this.data.category.id
      });
    }
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        this.categorias = data.categoryResponse.category;
        
        // 3. ¡LA SOLUCIÓN! Le avisamos a Angular que actualice el select de inmediato
        this.cdr.detectChanges();
      }, (error: any) => {
        console.log("Error al cargar categorías", error);
      }
    );
  }

  onFileSelected(event: any) {
    this.imagenSeleccionada = event.target.files[0];
  }

  onSave() {
    const formData = new FormData();
    formData.append('name', this.productForm.get('name')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('account', this.productForm.get('account')?.value);
    formData.append('categoryId', this.productForm.get('categoryId')?.value);
    
    if (this.imagenSeleccionada) {
      formData.append('picture', this.imagenSeleccionada);
    }

    if (this.data != null) {
      this.productService.updateProduct(formData, this.data.id).subscribe({
        next: (res) => {
          this.dialogRef.close(1); 
        },
        error: (err) => console.log('Error actualizando', err)
      });
    } else {
      this.productService.saveProduct(formData).subscribe({
        next: (res) => {
          this.dialogRef.close(1); 
        },
        error: (err) => console.log('Error guardando', err)
      });
    }
  }

  onCancel() {
    this.dialogRef.close(2); 
  }
}