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
  formCategoryName: string | undefined;
  isSaving: boolean = true;
  categoryArray: Category[] = [];
  formStatus: string = 'Add';

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

    if( this.formStatus == 'Add'){
      this.categoryService.saveCategory( categoryData ).subscribe({
        next: response => {
          if( response.success === 1 ){
            this.categoryService.showSuccess( response.message );
            formData.reset();
            this.formCategoryID = 0;
            this.loadCategories();
          }else{
            this.categoryService.showError( response.message );
          }
        },
        error: err => {
          this.isSaving = false;
          console.error('Failed to save category:', err);
          this.categoryService.showError('Failed to save category!');
        }
      });
    }else if( this.formStatus == 'Edit' && this.formCategoryID ){
      this.categoryService.updateCategory( this.formCategoryID, categoryData ).subscribe({
        next: response => {
          if( response.success === 1 ){
            this.categoryService.showSuccess( response.message );
            formData.reset();
            this.loadCategories();
          }else{
            this.categoryService.showError( `Error: ${response.message}` );
          }
          this.isSaving = false;
        },
        error: err => {
          this.isSaving = false;
          console.error('Failed to update category:', err);
          this.categoryService.showError('Failed to update category!');
        }
      });
      return;
    }
  }

  onEdit( category_name: string | undefined, category_id: number ): void{
    console.log( category_id, category_name );
    this.formCategoryID = category_id;
    this.formCategoryName = category_name;
    this.formStatus = 'Edit';
  }

  onDelete( id: number ){
    this.formCategoryID = id;
    this.categoryService.deleteCategory( this.formCategoryID ).subscribe({
      next: response => {
        if( response.success === 1 ){
          this.categoryService.showSuccess( response.message );
          this.loadCategories();
        }else{
          this.categoryService.showError( `Error: ${response.message}` );
        }
        this.isSaving = false;
      },
      error: err => {
        this.isSaving = false;
        console.error('Failed to save category:', err);
        this.categoryService.showError('Failed to save category!');
      }
    })
  }

  private loadCategories(){
    this.categoryService.getCategories().subscribe({
      next: (response: ApiResponse<Category[]>) => {
        this.categoryArray = response.data ?? [];
        this.isSaving = false;
        this.formStatus = 'Add';
        this.formCategoryID = 0
      },
      error: err => {
        console.error('Failed to load categories', err);
        this.categoryService.showError('Could not load categories');
        this.isSaving = false;
      }
    })
  }

}
