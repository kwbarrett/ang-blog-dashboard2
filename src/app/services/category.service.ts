import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiURL = environment.apiURL;
  constructor(
    private http: HttpClient,
  ) { }

  saveCategory( data: Category ): Observable<{ success: number; message: string }> {
    return this.http.post<{ success: number; message: string }>(`${this.apiURL}categories/insert.php`, data)
  }

  getCategories(): Observable<{ success: number, data: Category[] }> {
    return this.http.get<{ success: number; data: Category[] }>(`${this.apiURL}categories/view.php`);
  }
}
