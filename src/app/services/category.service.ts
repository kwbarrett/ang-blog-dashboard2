import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category, ApiResponse } from '../models/category';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiURL = `${environment.apiURL}categories/`;
  private readonly jsonHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  showSuccess( message: string ): void{
    this.toastr.success( message, 'Sucess',{
      timeOut: 3000,
      progressBar: true,
      closeButton: true
    } )
  }

  showError( message: string ): void {
    this.toastr.error(message, 'Error', {
      timeOut: 5000,
      progressBar: true,
      closeButton: true,
    });
  }

  saveCategory( data: Category ): Observable<ApiResponse<Category>>{
    const url = `${this.apiURL}insert.php`;
    return this.http.post<ApiResponse<Category>>( url, data,{
      headers: this.jsonHeaders,
    } );
  }

  getCategories(): Observable<ApiResponse<Category[]>> {
    const url = `${this.apiURL}view.php`;
    return this.http.get<ApiResponse<Category[]>>( url, {
      headers: this.jsonHeaders
    });
  }

  updateCategory( id: number, categoryData: Category ): Observable<ApiResponse<Category>>{
    const url = `${this.apiURL}update.php?id=${id}`;
    return this.http.put<ApiResponse<Category>>( url, categoryData, {
      headers: this.jsonHeaders
    } )
  }
}
