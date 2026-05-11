import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './components/category/category';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    RouterModule.forChild([
      {
        path: '',
        component: CategoryComponent
      }
    ])
  ]
})
export class CategoryModule { }