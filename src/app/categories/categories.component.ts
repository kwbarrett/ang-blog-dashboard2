import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category, ApiResponse } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  formCategoryID: number = 0;
  isSaving: boolean = true;
  categoryArray: Category[] = [];

  constructor( private categoryService: CategoryService ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  onSubmit( formData: any ){
    let categoryData: Category = {
      id: this.formCategoryID,
      category_name: formData.value.category_name
    }
    this.isSaving = true;
    console.log(categoryData);
    this.categoryService.saveCategory( categoryData ).subscribe({
      next: response => {
        if( response.success === 1 ){
          this.categoryService.showSuccess('Category saved successfully!');
          formData.reset();
          this.formCategoryID = 0;
          this.loadCategories();
        }else{
          this.categoryService.showError('Failed to save category!');
        }
      },
      error: err => {
        this.isSaving = false;
        console.error('Failed to save category:', err);
        this.categoryService.showError('Failed to save category!');
      }
    });
  }

  private loadCategories(){
    this.categoryService.getCategories().subscribe({
      next: (resp: ApiResponse<Category[]>) => {
        this.categoryArray = resp.data ?? [];
        this.isSaving = false;
      },
      error: err => {
        console.error('Failed to load categories', err);
        this.categoryService.showError('Could not load categories');
        this.isSaving = false;
      }
    })
  }

}
