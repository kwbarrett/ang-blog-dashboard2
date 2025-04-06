import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  formCategoryID: number = 0;

  constructor( private categoryService: CategoryService ) { }

  ngOnInit(): void {

  }

  onSubmit( formData: any ){
    let categoryData = {
      id: this.formCategoryID,
      category_name: formData.value.category_name
    }
    console.log(categoryData);
    this.categoryService.saveCategory( categoryData ).subscribe( (response) => {
      if (response.success == 1) {
        // Handle success response
        console.log('Category saved successfully:', response.message);
        alert('Category saved successfully');
        formData.reset();
        this.formCategoryID = 0;
        this.categoryService.getCategories().subscribe( (response) => {
          console.log(response);
        });
      } else {
        // Handle failure response
        console.error('Failed to save category:', response.message);
        alert('Failed to save category');
      }
    },
    (error) => {
        // Handle error response
        console.error('Error:', error);
      });
  }

}
